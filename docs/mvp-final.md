# Nullify — Final MVP Spec

**Status:** Approved scope for v1. Supersedes `chat-gpt-version-mvp.md` (kept as the long-term vision doc).
**Constraint check:** solo builder, 5–10 hrs/week, target $1–2k MRR. Everything below fits that; everything cut is listed with the trigger for when to build it.

---

## The verdict on the vision doc

`chat-gpt-version-mvp.md` describes Podium/Weave/GoHighLevel — mature platforms built by large teams and priced at $249–399/mo. As a *destination* it's right. As an *MVP* it's a trap: team inbox with mentions, native mobile app, full booking engine with calendar sync, CRM, revenue prediction, 7+ integrations, multi-location, and three pricing tiers is 2–3 years of solo work before the first customer.

It also misses the two hardest real-world problems entirely — **A2P 10DLC compliance** and **call-forwarding setup UX** — and its "if answered: Nullify logs the interaction" assumption is architecturally wrong for our conditional-forwarding design (we never see answered calls; we'd have to port their number, which we deliberately don't).

**What we harvest from it** (cheap now, high leverage):
1. **AI conversational replies** instead of a static text-back — the single biggest differentiator vs. $25/mo missed-call-text-back tools.
2. **AI voicemail summary** with urgency + estimated value — one transcription + one LLM call, huge perceived value.
3. **The daily digest** ("Good morning, Mike — yesterday AI recovered 5 leads, $1,540") — habit formation beats a monthly report.
4. **Revenue-first dashboard** framing — "Recovered Revenue" as the homepage number.
5. **Vertical presets** — pre-filled business brain per trade, makes 15-minute setup real.

Everything else in that doc is post-traction.

---

## The one loop that matters

> Missed call → instant text-back (<5s) → AI holds the conversation → booking request → owner confirms with one tap → confirmation SMS → dashboard credits the recovered revenue → daily digest reminds the owner Nullify did it.

Every MVP feature exists to close this loop or make its value legible. Anything that doesn't touch the loop is out.

---

## In scope (v1)

### 1. Onboarding + "Business Brain" (15 minutes, no sales call)
- Business profile: name, vertical, services, hours, average ticket, booking link (optional).
- **Business Brain:** one free-text field ("paste your pricing, FAQs, policies") that grounds the AI. No document upload, no "AI training center" — a textarea.
- **Vertical presets** for 3 launch trades (HVAC, plumbing, electrical): pre-filled services, greeting, FAQ skeleton, average ticket. Presets are seed data, not code.
- Twilio subaccount + local number provisioning; carrier-specific forwarding codes (*71, *004…) with copy-paste instructions.
- **Self-test step:** "Now call your own business number and don't pick up." Owner watches the text arrive on their own phone. This is the activation moment — onboarding isn't complete until it fires.

### 2. Missed-call capture
- Voice webhook: branded greeting → record voicemail → status callback.
- Instant SMS text-back from the business's number, personalized template + booking link.
- Contact auto-created per caller (name if known, number, history). This is the entire "CRM" for v1.
- **Spam guard:** Twilio Lookup line-type check (skip known VoIP/toll-free robocallers), dedupe repeat callers within a window, never text the same number twice per day for text-back. Robocalls burning SMS budget and polluting the dashboard would quietly kill trust in the numbers.

### 3. AI SMS receptionist (the differentiator) — with guardrails
- Incoming replies get an AI response grounded **only** in the Business Brain.
- **Confidence fallback:** if the answer isn't in the Brain, AI says "Great question — let me have [owner] text you right back," and pings the owner. The AI never invents prices or availability.
- **Two modes per business:** auto-reply (default) or suggest-only (AI drafts, owner taps send). Suggest-only is the trust on-ramp for skeptical owners.
- Same LLM call also tags the conversation intent (Emergency / Quote / Booking / Spam) — one extra output field, nearly free, powers the inbox and digest.
- Owner is pinged (SMS + email) on: booking intent, emergency tag, AI fallback, or any conversation idle-with-customer-waiting.

### 4. AI voicemail summary
- Recording → transcription → one LLM call → card in inbox + owner notification:
  *"Leaking kitchen pipe. Urgency: high. Wants tomorrow AM. Est. value: $350–600."*
- Estimated value derived from Business Brain pricing + vertical preset ranges; clearly labeled as an estimate.

### 5. Shared inbox (simple)
- Conversation list + thread view, send message, open/done status, intent tag, contact pane with call/SMS history.
- Multiple logins per business are fine (Better Auth handles it). **No** assignments, mentions, labels, attachments, or read receipts — the customer is a 1–5 person shop, not a support team.
- Polling, not websockets.

### 6. One smart follow-up
- No reply after 2h (configurable) → one gentle nudge via Inngest. Any inbound reply cancels it. One follow-up, not a sequence — sequences invite carrier filtering and owner distrust.

### 7. Booking **requests**, not a booking engine
- If the owner has a booking link (Calendly, Housecall Pro, anything), the AI uses it. Done.
- Otherwise: a hosted one-page form — pick service + 2–3 preferred time windows → creates a booking request → owner confirms/proposes-new with one tap → customer gets confirmation SMS + one reminder.
- **No** availability engine, no technician selection, no Google Calendar sync, no double-booking logic. The owner's calendar stays the source of truth. This is ~a weekend of work instead of a month.

### 8. ROI dashboard (the homepage)
- Today + this month: **Recovered Revenue** (hero number), missed calls caught, leads engaged, booking requests, bookings confirmed, revenue at risk (leads still waiting), avg response time.
- Recovered revenue = confirmed bookings × avg ticket, plus engaged-lead estimate at a configurable close rate. Conservative by default — an inflated number the owner doesn't believe is worse than a small one they do.
- Numbers only, no charts in v1.

### 9. Daily digest (habit + retention)
- Every morning, email (+ optional SMS): yesterday's missed/recovered/booked numbers, recovered $, and **"still waiting: Sarah — est. $720"** with a deep link into the thread.
- End-of-trial email: "In your 14-day trial, Nullify recovered an estimated $X." Sent 2 days before the card is charged. This is the conversion moment.
- Monthly summary email stays (from the original plan).

### 10. Compliance & plumbing
- A2P 10DLC wizard (TrustHub API): secondary profile → brand (Low-Volume Standard, Sole-Prop fallback) → campaign; Inngest status polling; clear rejection/resubmission UX; onboarding sets the 1–3 day approval expectation explicitly.
- STOP/HELP opt-out via Twilio Advanced Opt-Out (configuration, not code).
- **Quiet hours:** configurable; default ON text-back 24/7 (a 2am missed emergency call is the highest-value save for a plumber), but follow-ups and digests respect business hours.
- Business identification in first message ("This is Mike's Plumbing") — TCPA hygiene.

### 11. Billing
- **One plan.** $49/mo founding-customer rate (list price $99 later — say so on the pricing page), 14-day trial, 500 SMS segments included, overage handled with a soft-warning email at 80% (hard metering post-MVP). LLM cost per customer is ~$1–2/mo — noise in the margin.
- No tiers until there are customers asking for tier-shaped things.

---

## Explicitly OUT of v1 (and what triggers building each)

| Cut | Build when |
|---|---|
| Native mobile app | Never for MVP. Responsive web + SMS notifications. Revisit at ~50 customers if usage data demands it. |
| Team inbox (assign/mention/labels) | A paying customer with >5 staff asks. |
| Booking engine + Google Calendar sync | ≥5 customers report double-booking pain or booking-link friction. |
| Full CRM (jobs, invoices, LTV, reviews) | Post-traction; contacts + timeline already fall out of the inbox. |
| Analytics charts | Dashboard numbers stop being enough (customer request). |
| AI insights/recommendations ("hire a lunch receptionist") | The digest covers the value; revisit at scale. |
| AI revenue prediction | Cut indefinitely — speculative numbers erode trust in the real ones. |
| Integrations (HubSpot, ServiceTitan, QuickBooks, Zapier…) | Two+ paying customers request the *same* one. |
| Multi-location, API, custom workflows, prompt-testing center | A Pro-tier customer exists to pay for them. |
| Three pricing tiers | ~20 customers, when real usage shows where the tier line is. |
| Answered-call logging | Requires number porting — different product. Not in this architecture. |

---

## How this MVP earns "indispensable"

The vision doc's answer to indispensability is breadth. A solo builder can't win on breadth — Podium already exists. The MVP's answer is **owning one loop end-to-end plus data gravity**:

1. **Wired into the phone line.** Turning Nullify off means visibly going back to losing leads — the forwarding path is switching cost.
2. **The conversation + contact history lives here.** Every week it runs, leaving costs more.
3. **Value is legible daily.** The digest and the recovered-revenue number mean the owner never has to wonder what they're paying for — the #1 churn killer in SMB SaaS.
4. **The AI answers when they can't.** Once an owner has watched the AI book a job while they were under a sink, a static text-back tool feels broken.

Depth on one workflow, not breadth across ten.

---

## Timeline impact

The approved 10-week plan absorbs the additions at roughly +2 weeks (AI reply engine ~1 wk, voicemail summary ~2 days, digest ~2 days, booking-request page ~3 days, spam guard ~1 day):

- **Phase 1 (done):** scaffold, auth, Stripe, marketing site ✅
- **Phase 2 (wks 3–5):** telephony core + spam guard + contact auto-creation
- **Phase 2.5 (wks 6–7):** AI receptionist + voicemail summary (dogfood as customer #0 with a real phone)
- **Phase 3 (wks 8–9):** A2P wizard
- **Phase 4 (wks 10–11):** ROI dashboard, booking requests, follow-up, daily digest, quiet hours
- **Phase 5 (wk 12):** launch — design partners → testimonials → paid

Design-partner recruitment (3–5 home-services shops, 30 days free) runs in parallel starting **now** — it needs zero code and de-risks everything else.

## MVP success criteria

- **Activation:** new business completes self-test call within 48h of signup.
- **Aha:** first real recovered lead within 7 days of going live.
- **Value proof:** trial-end email shows recovered $ ≥ 3× the subscription price.
- **Traction bar:** 5 design partners → ≥3 convert to paid → then spend on marketing, not features.
