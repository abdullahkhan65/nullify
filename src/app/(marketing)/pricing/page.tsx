import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/marketing/reveal";

export const metadata: Metadata = {
  title: "Pricing — Nullify",
  description:
    "$49/month flat. No contract, no setup fee, no per-text surprises. 14-day free trial.",
};

const included = [
  { item: "Your dedicated business texting number", detail: "A local number for your area code — yours as long as you subscribe." },
  { item: "Every missed call caught, 24/7", detail: "No caps on calls. Nights, weekends, lunch breaks, both lines ringing at once." },
  { item: "Instant text-back in your words", detail: "Edit every template. Your name, your tone, your booking link." },
  { item: "Two-way SMS inbox", detail: "Reply from any browser — truck, couch, or office. Your whole history in one place." },
  { item: "One polite auto follow-up", detail: "If a caller goes quiet, one nudge at the delay you choose. Never more." },
  { item: "Voicemail with transcription", detail: "Read it next to the conversation instead of dialing into a mailbox." },
  { item: "A2P compliance registration, filed for you", detail: "The carrier paperwork ($400/mo platforms charge 'compliance fees' for this) — included." },
  { item: "Recovered-revenue dashboard + monthly report", detail: "See in dollars what came back. If the number doesn't beat $49, cancel." },
  { item: "Founder email support", detail: "Your email lands in the inbox of the person who wrote the code." },
];

const notIncluded = [
  "A CRM you have to learn",
  "Review management, web chat, or mass-marketing blasts",
  "Contracts, onboarding calls, or a sales rep 'checking in'",
  "Per-seat pricing — your whole crew can use the inbox",
];

const pricingFaqs = [
  {
    q: "Why do you need a card for the free trial?",
    a: "So the trial is real: you set everything up once, and if Nullify earns its keep you don't have to touch it again. You get an email reminder 3 days before the trial ends, and cancelling during the trial costs exactly $0 — two clicks, no call.",
  },
  {
    q: "Do you charge per text?",
    a: "No. Normal texting volume is included — a busy shop's missed-call traffic rarely exceeds a few hundred texts a month. If your volume is consistently extraordinary (thousands of texts), we'll talk to you first before anything changes. You will never open a surprise bill.",
  },
  {
    q: "Is there a setup fee?",
    a: "No. The $15–60 of carrier registration fees that compliance filing actually costs us is baked into your subscription. Some competitors bill this as a separate 'activation fee' — we don't.",
  },
  {
    q: "What happens when the trial ends?",
    a: "Your card is charged $49 and nothing else changes. If you cancel before the trial ends, you pay nothing and your forwarding code stops routing calls to us the moment you dial it off.",
  },
  {
    q: "What if I have multiple locations or crews?",
    a: "Today, one subscription covers one business line. If you run several locations, email us — we'll set you up manually until multi-location support ships, and you won't pay full price for the extra lines while it's manual.",
  },
  {
    q: "Will the price go up on me?",
    a: "The price you sign up at is the price you keep. If we ever raise prices, it applies to new customers — early customers are how we got here.",
  },
  {
    q: "What's your refund policy?",
    a: "If Nullify didn't do what this site says in your first paid month, email us and we'll refund that month. No form, no argument. After that, it's month-to-month — cancelling stops the next charge.",
  },
  {
    q: "Are there taxes on top?",
    a: "US sales tax is added where states require it for software subscriptions — it's shown on the checkout page before you confirm, never after.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-blueprint relative overflow-hidden border-b border-[#2a3038]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,115,22,0.1),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
            Pricing
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            <span className="font-mono text-orange-400">$49</span>/month.
            <br />
            That&apos;s the whole pricing page.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-400">
            One plan, everything included, no contract. The rest of this page just
            proves there&apos;s no fine print — and answers the billing questions
            you&apos;d ask anyway.
          </p>
          <Link
            href="/sign-up"
            className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-black shadow-[0_0_30px_-8px_rgba(249,115,22,0.8)] hover:bg-orange-400"
          >
            Start your 14-day free trial
          </Link>
          <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
            free for 14 days · cancel in two clicks · keep your number
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <Reveal>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Everything in the plan
              </h2>
            </Reveal>
            <div className="mt-8 flex flex-col gap-4">
              {included.map((row, i) => (
                <Reveal key={row.item} delayMs={i * 50}>
                  <div className="flex gap-4 rounded-xl border border-[#2a3038] bg-[#10141a] p-4">
                    <span className="font-mono text-lg font-bold text-emerald-400">✓</span>
                    <div>
                      <p className="font-semibold text-zinc-100">{row.item}</p>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">{row.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Reveal delayMs={100}>
              <div className="rounded-xl border border-[#2a3038] bg-[#10141a] p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                  Deliberately not included
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {notIncluded.map((row) => (
                    <li key={row} className="flex gap-3 text-sm leading-6 text-zinc-400">
                      <span className="font-mono font-bold text-red-400">✗</span>
                      {row}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-[#2a3038] pt-4 text-sm leading-6 text-zinc-500">
                  If you want an all-in-one platform, Podium and GoHighLevel are
                  genuinely good — at 5–9× the price. Nullify does the one thing
                  that recovers missed revenue.
                </p>
              </div>
            </Reveal>
            <Reveal delayMs={180}>
              <div className="rounded-xl border border-orange-500/30 bg-gradient-to-br from-[#161b22] to-[#1a1510] p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-orange-400">
                  The math, one more time
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  One recovered job usually pays for 3–10 months of Nullify. Our{" "}
                  <Link href="/#calculator" className="text-orange-400 underline underline-offset-4">
                    calculator
                  </Link>{" "}
                  assumes we only win back 1 caller in 10 — run your own numbers
                  before you spend a dollar.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="border-t border-[#2a3038] bg-[#10141a]">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-2xl font-black tracking-tight sm:text-3xl">
              Billing questions, answered before you ask
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-3">
            {pricingFaqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[#2a3038] bg-[#0c0f14] px-5 py-4 open:border-orange-500/30 open:pb-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-200 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="text-orange-500 transition-transform group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-zinc-500">
            Product questions instead? See{" "}
            <Link href="/how-it-works" className="text-orange-400 underline underline-offset-4">
              how it works
            </Link>{" "}
            or the{" "}
            <Link href="/#faq" className="text-orange-400 underline underline-offset-4">
              main FAQ
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
