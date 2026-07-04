import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/marketing/reveal";

export const metadata: Metadata = {
  title: "How it works — Nullify",
  description:
    "The full walkthrough: conditional call forwarding, carrier codes, SMS compliance, and exactly what your customers see. 15-minute setup, no number change.",
};

const setupTimeline = [
  {
    when: "Minute 0–10",
    title: "Create your account and business profile",
    body: "Your business name, area code, and how you want the text-back worded (we start you with a proven template — edit anything). You'll pick a local Nullify number for your business texting.",
  },
  {
    when: "Minute 10–15",
    title: "One compliance form",
    body: "US carriers require business texting to be registered to a real business — it's called A2P 10DLC. Our wizard asks for the same info as a credit application header (legal name, address, EIN — or none if you're a sole proprietor) and files it for you.",
  },
  {
    when: "Day 1–3",
    title: "Carriers approve your registration",
    body: "The approval comes from the carriers, not us — it typically takes 1–3 business days. We email you the moment it clears. Nothing for you to do, and your trial is long enough that this wait doesn't eat it.",
  },
  {
    when: "2 minutes, once approved",
    title: "Dial your forwarding code",
    body: "We show you the exact code for your carrier. Dial it once from your business phone, hear the confirmation, done. From now on, only calls you don't answer route to Nullify.",
  },
  {
    when: "From then on",
    title: "It works while you work",
    body: "Answered calls behave exactly as before. Missed calls get a voicemail greeting and an instant text-back. You reply from the inbox when you're free.",
  },
];

const forwardingFacts = [
  {
    q: "What is conditional call forwarding, exactly?",
    a: "A setting inside your carrier's network (not an app) that redirects a call only when you don't answer, decline, or are unreachable. It has existed for decades — Nullify just gives the redirected call somewhere useful to go. Your phone, SIM, and number are untouched.",
  },
  {
    q: "Which carriers does it work with?",
    a: "All major US carriers — Verizon, AT&T, T-Mobile and their prepaid brands — plus most VoIP and landline providers. The dial codes differ (*71, *004, and carrier-specific variants), so we detect your carrier during setup and hand you the exact code. If yours is unusual, support will figure it out with you.",
  },
  {
    q: "Does it work on landlines or office phone systems?",
    a: "Usually yes — most landline and VoIP providers support no-answer forwarding (often *92 or a web setting). During onboarding we give instructions for your provider; if it genuinely can't forward, we'll tell you straight and you shouldn't pay us.",
  },
  {
    q: "How do I turn it off?",
    a: "Dial the matching deactivation code (we show it right next to the activation code). Takes ten seconds, works even if you never touch Nullify again. Your phone reverts to exactly how it behaves today.",
  },
  {
    q: "Does Nullify see calls I answer?",
    a: "No. Answered calls never leave your carrier's network — technically we can't see them. We only know about a call when your carrier forwards it to us because you didn't pick up.",
  },
];

const callerExperience = [
  { label: "They hear", body: "Two or three rings, then a short greeting in your business's name: “Thanks for calling — we're helping another customer. Leave a message; we're also texting you right now.” You control every word." },
  { label: "They receive", body: "Within seconds, a normal SMS from your business texting number — your name, your wording, optionally your booking link. No 'sent via Nullify', no bot disclaimer walls, just a text that reads like you typed it fast." },
  { label: "They reply", body: "It's a normal text thread on their phone. They can reply at 2pm or 11pm — it waits in your inbox either way, and the thread stays alive until the job is won or closed." },
];

const edgeCases = [
  {
    q: "What if the caller is on a landline and can't receive texts?",
    a: "We check the number type before texting. Landline callers simply get your voicemail greeting like they would today — no failed-text weirdness — and the call still shows in your dashboard with its voicemail.",
  },
  {
    q: "What about spam calls — will Nullify text telemarketers?",
    a: "There are guardrails: one text-back per caller per day, no texts to numbers flagged as high-risk, and a daily send ceiling on your account. Worst case, a robocaller gets one polite text and you lose nothing.",
  },
  {
    q: "What if I miss two calls from the same person?",
    a: "They get one text-back, not a barrage. The second missed call just gets logged into the same conversation.",
  },
  {
    q: "What happens after hours?",
    a: "You set business hours. Outside them, the text-back can say so (“We're closed — we'll text you first thing tomorrow”), and follow-ups wait for morning instead of nudging someone at midnight.",
  },
  {
    q: "Can my office manager or crew use it too?",
    a: "Yes — the inbox is a web page, not a per-seat license. Anyone you trust can sign in and reply. One subscription covers the business line, not a head count.",
  },
  {
    q: "Is this legal? Do customers have to consent to being texted?",
    a: "Calling you is what invites the reply — a single business text responding to a customer's own call, with opt-out honored, is exactly the use-case carrier rules are designed for. The A2P registration we file is what makes it legitimate in the carriers' eyes, and STOP always works instantly.",
  },
  {
    q: "Where does my data live and who can see it?",
    a: "Your conversations live in our database, encrypted in transit and at rest, visible to you and anyone you give a login. We never mine, sell, or market to your customer list, and you can export everything anytime.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-blueprint relative overflow-hidden border-b border-[#2a3038]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.1),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
            How it works
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            No new phone. No new number. No app for your crew to ignore.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-400">
            Nullify sits behind a carrier feature your phone has had for decades.
            Here&apos;s the whole thing, minute by minute — including the parts
            other tools gloss over.
          </p>
        </div>
      </section>

      {/* Setup timeline */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">
            From sign-up to first rescued call
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-zinc-400">
            About 15 minutes of your time, spread over the carrier approval window.
          </p>
        </Reveal>
        <div className="mx-auto mt-14 max-w-3xl">
          {setupTimeline.map((item, i) => (
            <Reveal key={item.title} delayMs={i * 90}>
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-orange-500 font-mono text-xs font-black text-black">
                    {i + 1}
                  </span>
                  {i < setupTimeline.length - 1 && (
                    <span className="w-px flex-1 bg-[#2a3038]" />
                  )}
                </div>
                <div className="pb-10">
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                    {item.when}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-zinc-400">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Forwarding deep-dive */}
      <section className="border-y border-[#2a3038] bg-[#10141a]">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <Reveal>
            <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-orange-400">
              The part everyone asks about
            </p>
            <h2 className="mt-2 text-center text-3xl font-black tracking-tight sm:text-4xl">
              Call forwarding, demystified
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-3">
            {forwardingFacts.map((item) => (
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
        </div>
      </section>

      {/* What the caller experiences */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">
            What your customer actually experiences
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-zinc-400">
            The goal: they should feel <em>answered</em>, not processed.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {callerExperience.map((item, i) => (
            <Reveal key={item.label} delayMs={i * 110}>
              <div className="h-full rounded-xl border border-[#2a3038] bg-[#10141a] p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-orange-400">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delayMs={150}>
          <p className="mt-8 text-center text-sm text-zinc-500">
            Watch it play out on the{" "}
            <Link href="/" className="text-orange-400 underline underline-offset-4">
              home page demo
            </Link>
            .
          </p>
        </Reveal>
      </section>

      {/* Compliance explainer */}
      <section className="border-y border-[#2a3038] bg-[#10141a]">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-12 px-6 py-20 lg:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-5">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-400">
                Why we ask for your business details
              </p>
              <h2 className="text-3xl font-black tracking-tight">
                The compliance part, in plain English
              </h2>
              <p className="text-base leading-8 text-zinc-400">
                In the US, carriers require any software that texts on a business&apos;s
                behalf to register that business first — the system is called{" "}
                <strong className="text-zinc-200">A2P 10DLC</strong>. Registered texts get
                delivered; unregistered ones get filtered as spam. It&apos;s the single
                biggest reason DIY texting setups quietly stop working.
              </p>
              <p className="text-base leading-8 text-zinc-400">
                Nullify files this registration for you during onboarding — legal
                name, address, and EIN if you have one. Sole proprietors without an
                EIN have their own official registration path, and we handle that
                too. The $400/mo platforms do exactly the same filing; some bill it
                as a separate compliance fee.
              </p>
            </div>
          </Reveal>
          <Reveal delayMs={130}>
            <div className="rounded-xl border border-[#2a3038] bg-[#0c0f14] p-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                What we&apos;ll ask you for
              </h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm leading-6 text-zinc-300">
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> Legal business name & address</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> EIN — or none, if you&apos;re a sole proprietor</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> A contact phone & email</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> Two sample messages (we pre-fill these)</li>
              </ul>
              <p className="mt-4 border-t border-[#2a3038] pt-4 text-sm leading-6 text-zinc-500">
                That&apos;s it. No credit check, no documents to scan. Approval
                typically takes 1–3 business days and we email you when it clears.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Edge cases */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">
            The edge cases, because you were going to ask
          </h2>
        </Reveal>
        <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-3">
          {edgeCases.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-[#2a3038] bg-[#10141a] px-5 py-4 open:border-orange-500/30 open:pb-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-200 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="text-orange-500 transition-transform group-open:rotate-45">＋</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-[#2a3038]">
        <div className="safety-stripes absolute inset-x-0 top-0 h-1.5" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(249,115,22,0.12),transparent_60%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Fifteen minutes of setup.
            <br />
            Every missed call after that, caught.
          </h2>
          <Link
            href="/sign-up"
            className="rounded-lg bg-orange-500 px-8 py-4 text-lg font-bold text-black shadow-[0_0_40px_-8px_rgba(249,115,22,0.9)] hover:bg-orange-400"
          >
            Start your 14-day free trial
          </Link>
          <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
            $49/month after trial · <Link href="/pricing" className="underline underline-offset-4 hover:text-zinc-300">full pricing details</Link>
          </p>
        </div>
      </section>
    </>
  );
}
