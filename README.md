# Nullify

**Missed calls are lost jobs. Nullify texts them back instantly.**

Nullify is a missed-call revenue rescue tool for local service businesses. When a
business's phone rings unanswered, the caller instantly gets a text back from the
business (with a booking link), the owner gets notified, and a shared SMS inbox plus
one polite auto-follow-up keeps the lead alive. The dashboard shows estimated
recovered revenue.

The full product plan lives in `~/.claude/plans/lively-squishing-treasure.md`.

## Stack

- **Next.js (App Router) + TypeScript** — app, marketing pages, and webhooks in one deployable (Vercel)
- **Postgres (Neon) + Drizzle ORM**
- **Better Auth** — email/password auth
- **Stripe Billing** — single $49/mo plan, 14-day trial
- **Twilio** — voice webhooks, SMS, subaccount per customer, TrustHub for A2P 10DLC
- **Inngest** — follow-up scheduling and background jobs
- **Resend** — transactional email

## Local development

```bash
cp .env.example .env.local   # fill in values
npm install
npx drizzle-kit push          # sync schema to your database
npm run dev
```

- A local Postgres or a free Neon database works — set `DATABASE_URL`.
- Generate `BETTER_AUTH_SECRET` with `openssl rand -base64 32`.
- Stripe/Twilio/Inngest/Resend keys are only needed once you touch those features.
- Twilio webhooks need a public URL locally: `ngrok http 3000`.

## Project layout

```
src/
  app/
    (auth)/sign-in, sign-up   # auth pages
    dashboard/                # signed-in app shell
    api/auth/[...all]/        # Better Auth handler
    api/stripe/               # checkout + webhook
    page.tsx                  # marketing landing (home-services copy)
  components/                 # shared UI
  db/                         # drizzle client + schema (auth + app tables)
  lib/                        # auth, session, stripe, billing helpers
```

## Roadmap (phases)

1. ✅ Scaffold: auth, billing skeleton, schema, landing, dashboard shell
2. Telephony core: number provisioning, missed-call voice webhook, instant text-back, SMS inbox
3. A2P 10DLC compliance onboarding wizard (TrustHub)
4. Dashboard metrics, follow-up sequence, forwarding setup guide
5. Launch: landing polish, docs, design partners
