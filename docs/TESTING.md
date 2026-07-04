# Nullify Testing Plan

**Guiding constraint:** one maintainer, 5–10 hrs/week. Every test must earn its
maintenance cost. We bias toward (1) pure-logic unit tests that never flake,
(2) integration tests on the money paths (webhooks, billing, tenant isolation),
(3) one thin E2E happy path per user-facing flow, and (4) a disciplined *manual*
protocol for the parts a CI runner physically cannot test — real phone calls
over the PSTN.

**Status legend:** 🟢 testable today · 🟡 testable when Phase 2–3 lands · 🔴 launch-blocking gate

---

## 1. Tooling

| Layer | Tool | Why |
|---|---|---|
| Unit + integration | **Vitest** | Fast, TS-native, no config fight with Next |
| HTTP-level route tests | Vitest + direct route-handler invocation (`POST(new Request(...))`) | App Router handlers are plain functions — no server needed |
| External API stubbing | **msw** (or `vi.mock` on the twilio/stripe clients) | Deterministic Twilio/Stripe behavior |
| E2E browser | **Playwright** | Sign-up → dashboard → checkout flows |
| Test database | **Docker Postgres** locally / **Neon branch** in CI | Real Postgres, disposable; drizzle `push` per run |
| Stripe lifecycle | **Stripe CLI** (`stripe listen`, `stripe trigger`) + **test clocks** | Simulate trial expiry / payment failure without waiting 14 days |
| Twilio local webhooks | **ngrok** + Twilio **test credentials** & magic numbers (`+15005550006`) | Exercise provisioning/SMS APIs without spending money |
| Load (light) | **autocannon** | Webhook latency budget checks |
| Accessibility | **axe-core** via Playwright + Lighthouse | Landing page is the storefront |

Suggested layout:

```
src/**/*.test.ts          # unit, colocated with the code under test
tests/integration/**      # route handlers + DB
tests/e2e/**              # Playwright specs
docs/manual-test-protocol # printable checklists (§6, §9)
```

---

## 2. Unit tests (pure logic — write these first) 🟢/🟡

No I/O, no mocks beyond function arguments. Near-zero maintenance.

**Exists today 🟢**
- `isSubscriptionUsable`: `trialing`/`active` → true; `past_due`, `canceled`, `incomplete`, null → false.
- ROI calculator math (extract from the component into `src/lib/roi.ts`):
  monthly at-risk, 1-in-10 recovery floor (`Math.max(1, …)`), ROI multiple; boundary values of both sliders.
- Template rendering (extract to `src/lib/templates.ts` when Phase 2 starts):
  `{{business_name}}` substitution, unknown placeholders left intact, empty template.

**Phase 2–4 logic 🟡 (write alongside each feature)**
- **Business-hours evaluation**: given `BusinessHours` JSON + a timestamp + an IANA timezone → open/closed. Cases: overnight windows (`22:00–02:00`), DST spring-forward/fall-back days, empty day = closed, no schedule = always open. Timezone bugs here send texts at 3am — worth exhaustive cases.
- **Follow-up scheduling**: `lastMessageAt + followUpDelayHours`, clamped into business hours; canceled if caller replied first.
- **E.164 normalization**: `(555) 123-4567` → `+15551234567`; reject short codes, alphanumeric senders, international where unsupported.
- **SMS segment counting**: GSM-7 vs UCS-2 (one emoji flips the encoding and triples cost); warn threshold at >3 segments.
- **Recovered-revenue estimate**: calls × close rate × avg ticket; zero-call month; rounding.
- **Landline detection handling** (Twilio Lookup result → skip text-back, flag call as `voicemail`-only path).

---

## 3. Integration tests (route handlers + real test DB) 🟢/🟡

Run against Docker Postgres with schema pushed fresh; stub Twilio/Stripe SDKs.

### 3.1 Auth 🟢
- Sign-up: creates `user` + hashed credential `account`; duplicate email → clean error; password < 8 chars rejected.
- Sign-in: wrong password rejected; session cookie set; `requireSession` redirects anonymous users off `/dashboard`.
- Session lifecycle: sign-out invalidates the session token server-side (not just cookie deletion).
- Phase 2+: password reset token single-use + expiry; email verification.

### 3.2 Stripe billing 🟢 — this is the revenue path
- `POST /api/stripe/checkout`: anonymous → 401; missing `STRIPE_PRICE_ID` → 500; creates customer once (second call reuses `subscriptions` row — assert **no duplicate Stripe customers**).
- `POST /api/stripe/webhook`:
  - invalid/missing signature → 400, DB untouched (assert!);
  - `customer.subscription.created/updated/deleted` upserts status, `priceId`, `cancelAtPeriodEnd`;
  - `current_period_end` read from `items.data[0]` (Basil API shape) maps to a correct `Date`;
  - event for unknown `customer` id → 200, no crash, no row invented;
  - duplicate delivery of same event → idempotent result.
- **Test-clock scenarios** (Stripe CLI, semi-automated): trial → `active` on card success; trial → `past_due` → `canceled` on card failure; assert our gating flips at each step.

### 3.3 Tenant isolation 🟢🔴 — top security priority
For **every** data route as it's built: user A must never read/write user B's
businesses, conversations, messages, calls, or settings. Attempt direct-ID
access (IDOR) with a valid session for the wrong tenant → 403/404. This suite
is a launch gate; a leak here is fatal to trust in a product that holds
customer phone conversations.

### 3.4 Twilio voice webhook 🟡🔴 (when built)
- Returns valid TwiML `< 2s` (Twilio aborts slow webhooks): greeting `<Say>`/`<Play>` + `<Record>`.
- **Signature validation**: request without valid `X-Twilio-Signature` → 403, no DB writes. (Anyone on the internet can POST to this URL otherwise.)
- Creates `calls` row exactly once per `CallSid` — replay same callback → no duplicate (unique index enforced).
- Triggers text-back: correct template, correct from-number, `textbackSent` flips true.
- Caller is a landline (Lookup stub) → no SMS attempted, no crash, call still logged.
- Anonymous/blocked caller ID → logged, no SMS, no crash.
- Out-of-order status callbacks (`completed` before `ringing`) → consistent final state.

### 3.5 Twilio inbound SMS webhook 🟡🔴
- Signature validation as above.
- New caller → conversation created; existing → appended; `(businessId, callerE164)` uniqueness holds under **two concurrent inbound messages** (race test).
- Duplicate `MessageSid` delivery → one `messages` row.
- **STOP/HELP**: opt-out honored (carrier + legal requirement) — subsequent text-back suppressed for that caller; HELP returns identification. Confirm Twilio Advanced Opt-Out config in staging, and our layer respects it too.
- Inbound after conversation closed → reopens, notifies owner.

### 3.6 Compliance wizard (TrustHub) 🟡
- State machine: `not_started → in_progress → pending_review → approved/rejected`; illegal jumps rejected.
- Twilio API error surfaces (invalid EIN, address mismatch) → stored `failureReason`, wizard shows resubmission path.
- Sole-prop path skips EIN, enforces its constraints (US/CA only).
- **No text-back is ever sent for a business whose campaign is not `approved`** — assert the guard, since carriers filter unregistered traffic and it can poison the number's reputation.

### 3.7 Follow-up jobs (Inngest) 🟡
- Job scheduled on conversation creation; **canceled when caller replies** (the embarrassing bug: "just checking in!" after they already booked).
- Job respects business hours; one follow-up max; job survives redeploy (Inngest durability — verify in staging, not unit).

---

## 4. E2E browser tests (Playwright — keep to ~6 specs) 🟢/🟡

1. **Landing page**: hero + phone-demo terminal state renders ("Job booked — $450"), ROI sliders update the dollar figures, FAQ `<details>` expands, no console errors, both color schemes.
2. **Sign-up → dashboard**: form → redirected → stat cards visible; sign-out → `/dashboard` redirects to sign-in.
3. **Checkout**: click trial CTA → Stripe test-mode checkout loads (assert redirect URL, complete with `4242…` card in staging only).
4. 🟡 **Onboarding wizard**: business profile → number selection (stubbed Twilio) → compliance form → forwarding instructions shown.
5. 🟡 **Inbox**: seeded conversation renders; send reply (stubbed) appears optimistically; notification badge clears.
6. 🟡 **Settings**: edit text-back template, save, reload, persists.

Cross-cutting on spec 1: mobile viewport (375px), `prefers-reduced-motion` (demo jumps to final frame), axe-core scan with zero serious violations.

---

## 5. Security testing 🔴

- **AuthZ/IDOR sweep** — §3.3, automated, every route.
- **Webhook signatures** — Stripe + Twilio routes reject unsigned/tampered payloads (automated).
- **Toll-fraud / SMS-pumping controls** (real financial risk — attackers trigger SMS to premium numbers you pay for):
  - per-caller cap: max N text-backs per caller per day;
  - per-business daily SMS ceiling with alert to us;
  - Twilio geo-permissions locked to US/CA;
  - test: 20 "missed calls" from one caller in an hour → exactly 1 text-back.
- **Rate limiting**: sign-in/sign-up (credential stuffing), checkout creation.
- **Secrets hygiene**: `grep` CI check that `STRIPE_SECRET`, `TWILIO_AUTH_TOKEN` never appear in client bundles (`.next/static`); `.env*` untracked (except `.env.example`).
- **Headers**: basic CSP, `X-Frame-Options` on app routes.
- Dependency audit: `npm audit` in CI, fail on high/critical.

---

## 6. Real-phone manual protocol 🟡🔴 (cannot be automated — the PSTN is the product)

Run with **customer #0 (your own phone)** before any design partner, then again
before paid launch, on **at least two carriers** (e.g., Verizon + T-Mobile) since
conditional-forwarding codes and behavior differ.

**Setup**
- [ ] Forwarding code from our guide works on the carrier; confirmation tone/message received
- [ ] Normal answered call: rings through, **nothing** fires (no ghost texts)

**The core loop** (use a friend's phone as "caller")
- [ ] Ring out → greeting plays within 2 rings of forwarding
- [ ] Voicemail records; recording appears in dashboard with correct duration
- [ ] Text-back arrives **< 15s** from hang-up; correct business name/template; from the business's Nullify number
- [ ] Caller replies → appears in inbox **< 10s**; owner notification (email/SMS) fires
- [ ] Owner replies from inbox → arrives on caller's phone
- [ ] No reply from caller → follow-up arrives after configured delay, within business hours
- [ ] Caller replies → pending follow-up is canceled (verify it never sends)

**Edge cases**
- [ ] Declined call (busy) triggers flow, not just ring-out
- [ ] Landline caller: no SMS attempted; voicemail still captured; call logged
- [ ] Blocked caller ID: no crash; sensible dashboard entry
- [ ] Two callers miss simultaneously → two conversations, no cross-wiring
- [ ] Caller texts STOP → confirmed opt-out; later missed call sends **no** text
- [ ] Phone off / no service (hard unconditional case) → flow still works
- [ ] Forwarding disable code works; Nullify fully inert afterward
- [ ] iPhone + Android caller each render the SMS sanely (link previews, emoji)

**Quality**
- [ ] Text-back lands in the SMS inbox, not filtered (check on both carriers)
- [ ] Greeting audio quality acceptable; TTS pronounces the business name correctly

---

## 7. Performance budgets (light, automated where cheap)

- Voice webhook TwiML response **p95 < 2s** (Twilio hangs up on slow webhooks) — autocannon against staging with stubbed DB latency.
- Missed-call → SMS-sent **< 15s** end-to-end (measured in §6 and logged as a metric in-app).
- Landing page: Lighthouse performance ≥ 90 mobile; demo animation doesn't jank on a mid-tier phone.
- Dashboard queries indexed: `EXPLAIN` on inbox + stats queries at 10k messages (indexes already exist — verify they're used).

---

## 8. Data integrity & migrations

- Drizzle migration applies to a fresh DB **and** to a copy of prod schema (CI job) — no destructive drift.
- Cascade behavior: deleting a user removes businesses → numbers/calls/conversations/messages (asserted); Stripe customer and Twilio subaccount cleanup is **explicit** app logic, not FK cascade — test the offboarding routine (release number, close subaccount) when built.
- Conversation export produces complete, readable output (we promise this on the landing page).

---

## 9. Release gates

**Every deploy (CI):** lint · typecheck · unit · integration · secrets grep · `npm audit`.

**Before design partners:** §6 protocol passes on 2 carriers · §3.3 isolation suite green · A2P campaign for customer #0 `approved` · billing trial flow on test clock · ToS/Privacy pages live.

**Before paid launch:** all of the above, plus: §5 toll-fraud caps verified · Stripe **live-mode** end-to-end with a real card (then refund) · cancel-in-two-clicks verified live (we advertise it) · password reset works · error monitoring receiving events · restore-from-backup rehearsed once on Neon.

**Weekly while live (15 min):** call your own customer-#0 number, let it ring out, confirm the text arrives — a synthetic probe of the entire stack. Automatable later via a scheduled Twilio call.

---

## 10. Build order for the test harness

1. Vitest + first unit tests (`isSubscriptionUsable`, ROI math extraction) — half an evening
2. Docker Postgres + integration harness; auth + Stripe webhook suites (§3.1–3.2)
3. Playwright + specs 1–3
4. Grow §3.4–3.7 and specs 4–6 *alongside* each Phase 2–4 feature — never after
5. GitHub Actions pipeline once a remote exists
