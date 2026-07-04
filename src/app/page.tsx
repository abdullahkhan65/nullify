import Link from "next/link";
import { Faq } from "@/components/marketing/faq";
import { PhoneDemo } from "@/components/marketing/phone-demo";
import { RoiCalculator } from "@/components/marketing/roi-calculator";

const steps = [
  {
    title: "Dial one forwarding code",
    body: "A one-time phone setting. You keep your number and carrier — only the calls you don't answer reach Nullify. Pick up like normal and we stay invisible.",
  },
  {
    title: "Missed callers get an instant text",
    body: "Within seconds, the caller gets a text in your words, from your business: “Sorry we missed you — reply here and we'll get right back to you.”",
  },
  {
    title: "You reply and win the job",
    body: "Answer from a dead-simple inbox when you're free. If the caller goes quiet, Nullify sends one polite follow-up so the lead doesn't die on the vine.",
  },
];

const alternatives = [
  {
    name: "“They'll just leave a voicemail”",
    price: "Free",
    reality:
      "80% of callers won't. Voicemail is where leads go to die — a text conversation starts in 9 seconds and feels like being answered.",
  },
  {
    name: "An answering service",
    price: "$200–500/mo",
    reality:
      "A stranger reading a script, taking a message you still have to call back. Your customers can tell. And it's 4–10× the price.",
  },
  {
    name: "Podium, GoHighLevel & co.",
    price: "$249–449/mo",
    reality:
      "Great if you want a CRM, review engine, web chat, payments, and a sales rep checking in. Most owners use 10% of it and pay for 100%. Nullify does the one thing that recovers revenue.",
  },
  {
    name: "A new phone system",
    price: "$25–100/mo + migration",
    reality:
      "VoIP tools bury a text-back feature, but you have to move your number and retrain everyone. Nullify bolts onto the phone you already carry.",
  },
  {
    name: "Doing nothing",
    price: "$0 up front",
    reality:
      "The most expensive option on this list. Use the calculator above — most owners are stunned by the number.",
  },
];

const trustPoints = [
  {
    title: "No contract, ever",
    body: "Month to month. Cancel in two clicks from the dashboard — no phone call, no retention script.",
  },
  {
    title: "Your number stays yours",
    body: "We never touch your phone line. Turn forwarding off with one dial code and it's like we never existed.",
  },
  {
    title: "Your customers stay yours",
    body: "We never text your customers for our own marketing, never sell numbers, and you can export everything anytime.",
  },
  {
    title: "Compliance done properly",
    body: "Business texting is regulated (A2P 10DLC). We register your business the official way — the same rails the $400/mo platforms use.",
  },
  {
    title: "Honest math",
    body: "Our calculator assumes you only win back 1 in 10 missed callers. We'd rather under-promise and let the dashboard prove it.",
  },
  {
    title: "A real human answers",
    body: "Email support goes to the person who built the product, not a ticket queue in another timezone.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="sticky top-0 z-10 border-b border-zinc-200/60 bg-white/80 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight">Nullify</span>
          <nav className="flex items-center gap-5 text-sm">
            <a href="#calculator" className="hidden text-zinc-600 hover:text-zinc-900 sm:block dark:text-zinc-400 dark:hover:text-zinc-100">
              What it costs you
            </a>
            <a href="#faq" className="hidden text-zinc-600 hover:text-zinc-900 sm:block dark:text-zinc-400 dark:hover:text-zinc-100">
              FAQ
            </a>
            <Link href="/sign-in" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Start free trial
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero: the demo IS the pitch */}
        <section className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-up flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              For plumbers, HVAC techs, electricians & every busy trade
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Your phone just rang.
              <br />
              You were under a sink.
              <br />
              <span className="text-emerald-600 dark:text-emerald-400">
                That job isn&apos;t lost anymore.
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              85% of callers who don&apos;t reach you call your competitor next — and
              they won&apos;t leave a voicemail. Nullify texts every missed caller back
              within seconds, in your words, so the conversation starts with you.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/sign-up"
                className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-500"
              >
                Start your 14-day free trial
              </Link>
              <a
                href="#calculator"
                className="rounded-lg border border-zinc-300 px-6 py-3 font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                See what missed calls cost you
              </a>
            </div>
            <p className="text-sm text-zinc-500">
              $49/month flat · no contract · 15-minute setup · keep your number
            </p>
          </div>
          <div className="animate-fade-up [animation-delay:150ms]">
            <PhoneDemo />
            <p className="mt-4 text-center text-xs text-zinc-500">
              ▶ This plays out on your customer&apos;s phone — watch what happens 9
              seconds after you miss their call.
            </p>
          </div>
        </section>

        {/* Problem stats */}
        <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-14 text-center sm:grid-cols-3">
            <div>
              <p className="text-4xl font-bold text-red-600 dark:text-red-400">74%</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                of calls to local service businesses go unanswered during work hours
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-red-600 dark:text-red-400">85%</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                of missed callers never call back — they dial the next name on the list
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">9 sec</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                until your missed caller gets a text from you with Nullify on the job
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Set it up once. It works while you work.
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600/10 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ROI calculator */}
        <section id="calculator" className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              What are missed calls costing you right now?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-zinc-600 dark:text-zinc-400">
              Slide to your numbers. We deliberately assume Nullify only saves 1
              caller in 10 — the real dashboard will tell you the truth either way.
            </p>
            <div className="mt-10">
              <RoiCalculator />
            </div>
          </div>
        </section>

        {/* Objections: why not the alternatives */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            “Can&apos;t I just use…?”
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-zinc-600 dark:text-zinc-400">
            Fair question. Here&apos;s the honest comparison — including when you
            <em> shouldn&apos;t</em> pick us.
          </p>
          <div className="mt-12 flex flex-col gap-4">
            {alternatives.map((alt) => (
              <div
                key={alt.name}
                className="grid gap-2 rounded-xl border border-zinc-200 bg-white p-5 sm:grid-cols-[240px_120px_1fr] sm:items-baseline dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="font-semibold">{alt.name}</h3>
                <p className="text-sm text-zinc-500">{alt.price}</p>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{alt.reality}</p>
              </div>
            ))}
            <div className="grid gap-2 rounded-xl border-2 border-emerald-600 bg-emerald-50/50 p-5 sm:grid-cols-[240px_120px_1fr] sm:items-baseline dark:bg-emerald-950/20">
              <h3 className="font-semibold">Nullify</h3>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">$49/mo</p>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                One job: turn missed calls into booked jobs. Keep your number, your
                phone, your carrier. Live in 15 minutes, gone in two clicks if it
                doesn&apos;t earn its keep.
              </p>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              Why trust a tool you&apos;ve never heard of?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-zinc-600 dark:text-zinc-400">
              You shouldn&apos;t — yet. So we made every reason to leave easy, and
              every claim checkable.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trustPoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <h3 className="font-semibold">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Every question we&apos;d ask before paying for this
          </h2>
          <div className="mt-12">
            <Faq />
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              The next missed call is coming.
              <br />
              Decide now what happens to it.
            </h2>
            <Link
              href="/sign-up"
              className="rounded-lg bg-emerald-600 px-8 py-4 text-lg font-medium text-white hover:bg-emerald-500"
            >
              Start your 14-day free trial
            </Link>
            <p className="text-sm text-zinc-500">
              $49/month after trial · no contract · cancel in two clicks
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 text-sm text-zinc-500">
          <span>© {new Date().getFullYear()} Nullify</span>
          <span>Never lose a missed call again.</span>
        </div>
      </footer>
    </div>
  );
}
