# Nullify — Post-Release Playbook

**Status:** Approved go-to-market + operations plan for after the v1 launch (week 12 of `mvp-final.md`). Supersedes `chat-gpt-version-marketing-strategy.md` (kept for reference).
**Constraint check:** ~3–4 marketing/ops hours per week inside the 5–10 hr total budget. Target: 35–40 customers ≈ $1.7–2k MRR. Not 100 customers, not $10k.

---

## The verdict on the ChatGPT doc

Its instincts are right: pick one niche, find customers manually, no ads, price from day one, lean into the time-zone advantage. Keep all of that.

Its **operating assumptions are wrong for us**: "personally contact 500 businesses in 30 days," daily LinkedIn posts, cold-calling campaigns, and a $10k-MRR-then-expand roadmap describe a full-time founder-seller. At 3–4 hrs/week that plan collapses in week two. It also ignores the entire second half of post-release: **retention, activation, support, and pricing ops** — and for an SMB product with 5–10%/mo natural churn, retention *is* the growth strategy.

---

## The math that governs everything

- **Target:** 35–40 paying customers at $49 founding / $99 list.
- **Churn reality:** at 40 customers and ~7%/mo SMB churn, ~3 customers are lost per month. Steady state requires **~3 new customers/month forever** — or lower churn.
- **Cold outreach capacity:** ~30 personalized emails/week → realistically ~1 trial/week → **~2 paying/month** from cold email alone.
- **Conclusion:** cold email alone can *reach* the target slowly but can barely *hold* it. So (1) channels that compound — referrals, partnerships, SEO, case studies — must be layered in from month one, and (2) **every point of churn reduction is worth more than a new channel.** Timeline to target: 6–12 months, matching the original plan.

---

## Phase R0 — Launch fortnight (weeks 0–2)

1. **Convert design partners.** They've had 30 days free; each gets the ask: convert to $49 founding rate + give a testimonial + a 15-min case-study interview. Target: 3 of 5 convert.
2. **Write the first case study** from the best partner. One page: business name, problem, screenshot of their recovered-revenue dashboard, one quote, one number ("recovered $2,100 in month one"). This single asset roughly doubles cold-email conversion — nothing else this fortnight matters more.
3. **Founding-40 offer** goes on the pricing page: first 40 customers lock $49/mo for life; list price $99 shown crossed out. Real scarcity, real deadline behavior, and it pre-announces the price raise.
4. **Turn on the referral loop** (product feature, ~half a day): "Give a month, get a month." Service-business owners know each other; this is the cheapest channel that exists and it compounds.

---

## The Weekly Loop (~3.5 hrs, every week, non-negotiable)

The single most important post-release discipline. Same block, same order, every week:

| Time | Activity |
|---|---|
| 90 min | **25–30 personalized cold emails.** Google Maps method: search "[trade] [mid-size US city]", spreadsheet of name/owner/email/phone. Personalize with the **missed-call test** where possible: call the business once during their business hours (Twilio number, ~evening PKT overlap with US morning); if voicemail, the email opens: *"I called you Tuesday at 2pm and got voicemail — I build the tool that would have texted me back."* Attach the case study. |
| 45 min | **One community touch.** Answer one real question in a plumbing/HVAC owners' Facebook group or subreddit. Helpful first, product mention only when directly relevant. Credibility compounds; spam gets banned. |
| 45 min | **One content asset**, alternating weeks: (a) one SEO page — "missed call text back for [trade]" / "[trade] missed call statistics" / "[city] [trade] answering alternatives", or (b) one 30–60s demo clip (missed call → instant text → AI books → dashboard shows $450) — record the full flow once, cut many clips; post to YouTube Shorts + LinkedIn. |
| 30 min | **Follow-ups + metrics.** Reply to warm threads, nudge stale trials, check the weekly numbers (below). |

Everything else in the ChatGPT doc that doesn't fit in this loop is cut or demoted (see below).

---

## Channels, ranked by leverage-per-hour

1. **Case-study-armed cold email** — the workhorse. Volume is capped by hours, conversion is raised by proof.
2. **Partnerships (month 2+)** — the highest ceiling per hour spent: marketing agencies and web-dev shops serving contractors already hold dozens of our customers. Offer 20% recurring revenue share, or white-label later. One good agency ≈ months of cold email. Budget: 2–3 partnership pitches/month inside the outreach block.
3. **Referral loop** — built into the product, runs itself; mention it in the daily digest email footer.
4. **SEO pages** — slow but permanent; each Weekly Loop page compounds. Target long-tail "[trade/city] missed call" queries where nobody is competing.
5. **Demo videos** — the pitch is inherently visual; clips get reused in cold emails, the landing page, and community answers.
6. **Aggregate proof flywheel** — once ~10 customers exist, publish the network stat monthly: "Nullify customers recovered an estimated $38,400 in June." Product metric becomes marketing ammo automatically.

**Demoted or cut from the ChatGPT plan:**
- **Cold-calling campaigns** — cut as a channel (full-time activity, brutal from PKT hours). Survives only as the missed-call test personalization trick.
- **Daily LinkedIn posting** — cut. Plumbers aren't on LinkedIn daily; founders and investors are, and they aren't the customer. One post/week max, recycled from the content asset.
- **Build in public** — deprioritized to near-zero. Attracts other founders, not HVAC owners. Fine as an occasional morale post, not a channel.
- **Ads** — not before ~$2k MRR and a proven funnel, if ever.
- **"Expand industries at $10k MRR"** — wrong trigger. Strategy is build-horizontal/market-vertical: a new vertical is a landing page + preset, ~2 hours. Add one (locksmiths, garage door, appliance repair) at ~20 customers or when a vertical's cold-email reply rate goes stale.

---

## Retention ops — the half ChatGPT skipped

Churn is the boss fight, not acquisition.

- **Activation watch (weekly, in the metrics block):** flag any account that hasn't completed the self-test call within 48h or has zero missed calls captured in week one (forwarding probably misconfigured). One personal email: "Want me to walk you through the forwarding setup? Takes 5 minutes." An unactivated account is a guaranteed cancellation.
- **The digest is the retention engine.** Daily recovered-$ email keeps ROI legible (built in MVP). Watch for digest-open collapse — it precedes churn.
- **Value-at-risk alert:** any customer whose recovered-$ falls below ~2× subscription price for a month gets a personal check-in before they conclude it themselves.
- **Cancellation save flow:** exit survey (one question) + one save offer — pause for a month or drop to a $19 "capture-only" mode (text-back + inbox, no AI). A paused customer is a warm re-activation; a cancelled one is gone.
- **Annual plan (month 2+):** 2 months free ($490/yr). Every annual conversion removes a customer from the monthly churn pool and pulls cash forward. Pitch it in the trial-end "you recovered $X" email — the moment ROI is most visible.

## Pricing evolution

- Launch: **$49/mo founding rate** (lifetime for the first 40), 14-day self-serve trial. ChatGPT's 30-day trial stays design-partner-only — 30 days self-serve just delays the conversion signal.
- At customer #20: list price becomes **$99/mo** for new signups; founders grandfathered. Announce it — the raise itself is an urgency campaign.
- Annual option as above. No tiers until real customers ask for tier-shaped things (per `mvp-final.md`).

## Support ops (protecting the hour budget)

- `support@` with a stated next-business-day reply expectation; in practice the PKT/US offset means most tickets get answered "overnight" — customers experience this as speed. Lean into ChatGPT's one genuinely good framing: **feedback at their 5pm, fixed by their 9am.**
- Self-serve setup docs: carrier-forwarding guide per major US carrier, A2P timeline explainer, FAQ. Every support email that repeats becomes a doc page the same week.
- US-polished touchpoints throughout (spelling, phone formats, pricing in USD, US business examples). Entity/Stripe/banking were settled in Phase 1; if any gap remains (e.g., Stripe account country), it's a launch blocker, not a post-release task.

---

## The five weekly numbers

Tracked in 10 minutes inside the Weekly Loop. If it's not one of these, it's noise:

1. **MRR** (and net new customers)
2. **Cold-email replies** (channel health)
3. **Trial starts → activation rate** (self-test completed within 48h)
4. **Churn / saves**
5. **Aggregate recovered $ per customer** (the number that predicts #4)

## Checkpoints — de-risked, with exits

- **Week 4 post-launch:** ≥1 paying customer beyond design partners, or cold-email reply rate ≥3%. If neither → the pitch or the proof is broken; fix the case study/email before adding any channel.
- **Week 8:** ≥5 paying. If not, but replies are healthy → funnel problem (demo/trial/onboarding); if replies are dead → switch vertical (marketing pages only, zero code) and rerun.
- **Week 12:** ≥8–10 paying and first referral or partnership lead. If yes → this works, keep turning the loop. If no → structured decision: change vertical, change price, or shelve — with the data to choose.
- **Steady state (month 6–12):** 35–40 customers, churn <5%/mo (annual plans + activation rigor), Weekly Loop maintaining ~3 new/month. That's the whole business, running on ~4 hrs/week.
