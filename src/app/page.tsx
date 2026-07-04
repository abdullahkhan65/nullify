import Link from "next/link";
import { Faq } from "@/components/marketing/faq";
import { OwnerInboxMock } from "@/components/marketing/owner-inbox-mock";
import { PhoneDemo } from "@/components/marketing/phone-demo";
import { Reveal } from "@/components/marketing/reveal";
import { RoiCalculator } from "@/components/marketing/roi-calculator";
import { StatCounter } from "@/components/marketing/stat-counter";

/* Landing page is committed to a single dark, industrial look —
 * graphite base, safety-orange + emerald accents, blueprint textures. */

const steps = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M3 5.5C3 4.7 3.7 4 4.5 4h3L9 8l-2 1.5c1 2.5 3 4.5 5.5 5.5L14 13l4 1.5v3c0 .8-.7 1.5-1.5 1.5C9.6 19 5 14.4 5 7.5" />
      </svg>
    ),
    title: "Dial one forwarding code",
    body: "A one-time phone setting. You keep your number and carrier — only the calls you don't answer reach Nullify. Pick up like normal and we stay invisible.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M4 6h16v10H9l-4 4V6z" />
        <path d="M13 2l-1.5 4.5L16 5l-5 6 1.5-4.5L8 8l5-6z" fill="currentColor" stroke="none" transform="scale(0.55) translate(16 2)" />
      </svg>
    ),
    title: "Missed callers get an instant text",
    body: "Within seconds, the caller gets a text in your words, from your business: “Sorry we missed you — reply here and we'll get right back to you.”",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8L12 2z" />
      </svg>
    ),
    title: "You reply and win the job",
    body: "Answer from a dead-simple inbox when you're free. If the caller goes quiet, Nullify sends one polite follow-up so the lead doesn't die on the vine.",
  },
];

const timeline = [
  { time: "2:47:03 PM", event: "Sarah calls about a leaking water heater. You're under a sink across town.", tone: "neutral" },
  { time: "2:47:24 PM", event: "Call rings out. Without Nullify, this lead is gone — 85% never call back.", tone: "bad" },
  { time: "2:47:33 PM", event: "Nullify texts her back as your business, 9 seconds after the missed call.", tone: "good" },
  { time: "2:48:11 PM", event: "Sarah replies. The conversation — and the job — now belongs to you.", tone: "good" },
  { time: "3:04 PM", event: "You reply from your truck between jobs: “I can be there 3–4pm.”", tone: "neutral" },
  { time: "3:58 PM", event: "Job booked. $450 that would have gone to the next name on Google.", tone: "money" },
];

const toneStyles: Record<string, string> = {
  neutral: "border-zinc-600 bg-zinc-800",
  bad: "border-red-500 bg-red-500/20",
  good: "border-orange-500 bg-orange-500/20",
  money: "border-emerald-500 bg-emerald-500/20",
};

const alternatives = [
  {
    name: "“They'll just leave a voicemail”",
    price: "Free",
    verdict: "✗",
    reality:
      "80% of callers won't. Voicemail is where leads go to die — a text conversation starts in 9 seconds and feels like being answered.",
  },
  {
    name: "An answering service",
    price: "$200–500/mo",
    verdict: "✗",
    reality:
      "A stranger reading a script, taking a message you still have to call back. Your customers can tell. And it's 4–10× the price.",
  },
  {
    name: "Podium, GoHighLevel & co.",
    price: "$249–449/mo",
    verdict: "~",
    reality:
      "Great if you want a CRM, review engine, web chat, payments, and a sales rep checking in. Most owners use 10% of it and pay for 100%. Nullify does the one thing that recovers revenue.",
  },
  {
    name: "A new phone system",
    price: "$25–100/mo + migration",
    verdict: "~",
    reality:
      "VoIP tools bury a text-back feature, but you have to move your number and retrain everyone. Nullify bolts onto the phone you already carry.",
  },
  {
    name: "Doing nothing",
    price: "$0 up front",
    verdict: "✗",
    reality:
      "The most expensive option on this list. Use the calculator above — most owners are stunned by the number.",
  },
];

const trustPoints = [
  { icon: "🤝", title: "No contract, ever", body: "Month to month. Cancel in two clicks from the dashboard — no phone call, no retention script." },
  { icon: "📞", title: "Your number stays yours", body: "We never touch your phone line. Turn forwarding off with one dial code and it's like we never existed." },
  { icon: "🔒", title: "Your customers stay yours", body: "We never text your customers for our own marketing, never sell numbers, and you can export everything anytime." },
  { icon: "🛡️", title: "Compliance done properly", body: "Business texting is regulated (A2P 10DLC). We register your business the official way — the same rails the $400/mo platforms use." },
  { icon: "🧮", title: "Honest math", body: "Our calculator assumes you only win back 1 in 10 missed callers. We'd rather under-promise and let the dashboard prove it." },
  { icon: "👷", title: "A real human answers", body: "Email support goes to the person who built the product, not a ticket queue in another timezone." },
];

const heroChips = [
  { text: "📵 Missed call caught", className: "right-[-30px] top-[70px]", delay: "0s" },
  { text: "⚡ Text sent · 9s later", className: "left-[-56px] top-[240px]", delay: "1.3s" },
  { text: "✓ Job booked — $450", className: "right-[-44px] bottom-[120px]", delay: "2.6s" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[#0c0f14] text-zinc-100">
      {/* Safety stripe top band */}
      <div className="safety-stripes h-1.5 w-full" />

      <header className="sticky top-0 z-40 border-b border-[#2a3038] bg-[#0c0f14]/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <span className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-orange-500 font-mono text-sm font-black text-black">
              N
            </span>
            Nullify
          </span>
          <nav className="flex items-center gap-5 text-sm">
            <a href="#calculator" className="hidden text-zinc-400 hover:text-zinc-100 sm:block">
              What it costs you
            </a>
            <a href="#faq" className="hidden text-zinc-400 hover:text-zinc-100 sm:block">
              FAQ
            </a>
            <Link href="/sign-in" className="text-zinc-400 hover:text-zinc-100">
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-black hover:bg-orange-400"
            >
              Start free trial
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="bg-blueprint relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(16,185,129,0.12),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(249,115,22,0.08),transparent_50%)]" />
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <div className="animate-fade-up flex flex-col gap-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
                For plumbers · HVAC · electricians · every busy trade
              </p>
              <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
                Your phone just rang.
                <br />
                You were under a sink.
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
                  That job isn&apos;t lost anymore.
                </span>
              </h1>
              <p className="max-w-xl text-lg leading-8 text-zinc-400">
                85% of callers who don&apos;t reach you call your competitor next — and
                they won&apos;t leave a voicemail. Nullify texts every missed caller back
                within seconds, in your words, so the conversation starts with you.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/sign-up"
                  className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-black shadow-[0_0_30px_-8px_rgba(249,115,22,0.8)] hover:bg-orange-400"
                >
                  Start your 14-day free trial
                </Link>
                <a
                  href="#calculator"
                  className="rounded-lg border border-[#2a3038] px-6 py-3 font-medium text-zinc-200 hover:border-zinc-500 hover:bg-[#161b22]"
                >
                  See what missed calls cost you
                </a>
              </div>
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                $49/mo flat · no contract · 15-min setup · keep your number
              </p>
            </div>

            <div className="animate-fade-up relative mx-auto [animation-delay:150ms]">
              {heroChips.map((chip) => (
                <span
                  key={chip.text}
                  className={`animate-float absolute z-10 hidden rounded-full border border-[#2a3038] bg-[#161b22]/95 px-3.5 py-1.5 font-mono text-xs text-zinc-200 shadow-xl lg:block ${chip.className}`}
                  style={{ animationDelay: chip.delay }}
                >
                  {chip.text}
                </span>
              ))}
              <PhoneDemo />
              <p className="mt-4 max-w-[300px] text-center text-xs text-zinc-500">
                ▶ This plays out on your customer&apos;s phone — watch what happens 9
                seconds after you miss their call.
              </p>
            </div>
          </div>
        </section>

        {/* Problem stats */}
        <section className="border-y border-[#2a3038] bg-[#10141a]">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-14 text-center sm:grid-cols-3">
            <div>
              <p className="font-mono text-5xl font-black text-red-400">
                <StatCounter value={74} suffix="%" />
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                of calls to local service businesses go unanswered during work hours
              </p>
            </div>
            <div>
              <p className="font-mono text-5xl font-black text-red-400">
                <StatCounter value={85} suffix="%" />
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                of missed callers never call back — they dial the next name on the list
              </p>
            </div>
            <div>
              <p className="font-mono text-5xl font-black text-emerald-400">
                <StatCounter value={9} suffix=" sec" />
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                until your missed caller gets a text from you with Nullify on the job
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">
              Set it up once. It works while you work.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delayMs={i * 120}>
                <div className="relative flex flex-col gap-3 rounded-xl border border-[#2a3038] bg-[#10141a] p-6">
                  <span className="absolute -top-3 left-6 rounded bg-orange-500 px-2 py-0.5 font-mono text-xs font-black text-black">
                    STEP {i + 1}
                  </span>
                  <span className="mt-2 text-orange-400">{step.icon}</span>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-sm leading-6 text-zinc-400">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Anatomy of a rescued job */}
        <section className="border-y border-[#2a3038] bg-[#10141a]">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <Reveal>
              <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-orange-400">
                Tuesday, 2:47 PM
              </p>
              <h2 className="mt-2 text-center text-3xl font-black tracking-tight sm:text-4xl">
                Anatomy of a rescued job
              </h2>
            </Reveal>
            <div className="mx-auto mt-12 max-w-2xl">
              {timeline.map((item, i) => (
                <Reveal key={item.time} delayMs={i * 100}>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 ${toneStyles[item.tone]}`}
                      />
                      {i < timeline.length - 1 && (
                        <span className="w-px flex-1 bg-[#2a3038]" />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className="font-mono text-xs text-zinc-500">{item.time}</p>
                      <p className="mt-1 text-sm leading-6 text-zinc-300">{item.event}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Owner's side */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="flex flex-col gap-5">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-400">
                  Your side of the rescue
                </p>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  One inbox. Every lead that almost got away.
                </h2>
                <p className="text-lg leading-8 text-zinc-400">
                  No CRM to learn, no app your crew will ignore. Missed calls become
                  conversations, conversations get one polite follow-up if they stall,
                  and the dashboard adds up what came back — in dollars, not vanity
                  metrics.
                </p>
                <ul className="flex flex-col gap-2 font-mono text-sm text-zinc-300">
                  <li>→ Voicemails transcribed next to the thread</li>
                  <li>→ One tap to reply, from your truck</li>
                  <li>→ Monthly email: “here&apos;s what Nullify recovered”</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delayMs={150}>
              <OwnerInboxMock />
            </Reveal>
          </div>
        </section>

        {/* ROI calculator */}
        <section id="calculator" className="bg-blueprint border-y border-[#2a3038] bg-[#10141a]">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <Reveal>
              <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">
                What are missed calls costing you right now?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-zinc-400">
                Slide to your numbers. We deliberately assume Nullify only saves 1
                caller in 10 — the real dashboard will tell you the truth either way.
              </p>
            </Reveal>
            <Reveal delayMs={120}>
              <div className="mt-10">
                <RoiCalculator />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Objections */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">
              “Can&apos;t I just use…?”
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-zinc-400">
              Fair question. Here&apos;s the honest comparison — including when you
              <em> shouldn&apos;t</em> pick us.
            </p>
          </Reveal>
          <div className="mt-12 flex flex-col gap-4">
            {alternatives.map((alt, i) => (
              <Reveal key={alt.name} delayMs={i * 80}>
                <div className="grid gap-2 rounded-xl border border-[#2a3038] bg-[#10141a] p-5 sm:grid-cols-[28px_230px_150px_1fr] sm:items-baseline">
                  <span
                    className={`font-mono text-lg font-bold ${
                      alt.verdict === "✗" ? "text-red-400" : "text-yellow-400"
                    }`}
                  >
                    {alt.verdict}
                  </span>
                  <h3 className="font-bold text-zinc-200">{alt.name}</h3>
                  <p className="font-mono text-sm text-zinc-500">{alt.price}</p>
                  <p className="text-sm leading-6 text-zinc-400">{alt.reality}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delayMs={100}>
              <div className="grid gap-2 rounded-xl border-2 border-orange-500 bg-gradient-to-r from-orange-500/10 to-emerald-500/5 p-5 sm:grid-cols-[28px_230px_150px_1fr] sm:items-baseline">
                <span className="font-mono text-lg font-bold text-emerald-400">✓</span>
                <h3 className="font-bold">Nullify</h3>
                <p className="font-mono text-sm font-bold text-orange-400">$49/mo</p>
                <p className="text-sm leading-6 text-zinc-300">
                  One job: turn missed calls into booked jobs. Keep your number, your
                  phone, your carrier. Live in 15 minutes, gone in two clicks if it
                  doesn&apos;t earn its keep.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Trust */}
        <section className="border-y border-[#2a3038] bg-[#10141a]">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <Reveal>
              <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">
                Why trust a tool you&apos;ve never heard of?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-zinc-400">
                You shouldn&apos;t — yet. So we made every reason to leave easy, and
                every claim checkable.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trustPoints.map((point, i) => (
                <Reveal key={point.title} delayMs={i * 80}>
                  <div className="h-full rounded-xl border border-[#2a3038] bg-[#0c0f14] p-5">
                    <span className="text-xl">{point.icon}</span>
                    <h3 className="mt-2 font-bold">{point.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{point.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delayMs={200}>
              <div className="mx-auto mt-12 max-w-2xl rounded-xl border-l-4 border-orange-500 bg-[#0c0f14] p-6">
                <p className="text-sm leading-7 text-zinc-300">
                  “I&apos;m building Nullify solo, and the deal is simple: it does one
                  thing, it does it fast, and the dashboard shows you in dollars
                  whether it&apos;s earning its $49. If it isn&apos;t, leave — exporting
                  your data and cancelling take two clicks. Every support email lands
                  in my inbox, and I answer it.”
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-wider text-zinc-500">
                  — Abdullah · founder, builder & the entire support team
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">
              Every question we&apos;d ask before paying for this
            </h2>
          </Reveal>
          <div className="mt-12">
            <Faq />
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden border-t border-[#2a3038]">
          <div className="safety-stripes absolute inset-x-0 top-0 h-1.5" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(249,115,22,0.12),transparent_60%)]" />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              The next missed call is coming.
              <br />
              Decide now what happens to it.
            </h2>
            <Link
              href="/sign-up"
              className="rounded-lg bg-orange-500 px-8 py-4 text-lg font-bold text-black shadow-[0_0_40px_-8px_rgba(249,115,22,0.9)] hover:bg-orange-400"
            >
              Start your 14-day free trial
            </Link>
            <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
              $49/month after trial · no contract · cancel in two clicks
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#2a3038]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 text-sm text-zinc-500">
          <span>© {new Date().getFullYear()} Nullify</span>
          <span className="font-mono text-xs uppercase tracking-wider">
            Never lose a missed call again
          </span>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#2a3038] bg-[#0c0f14]/95 p-3 backdrop-blur sm:hidden">
        <Link
          href="/sign-up"
          className="block rounded-lg bg-orange-500 py-3 text-center font-bold text-black"
        >
          Start free trial — $49/mo after
        </Link>
      </div>
    </div>
  );
}
