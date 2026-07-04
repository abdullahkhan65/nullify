import Link from "next/link";

const steps = [
  {
    title: "Forward missed calls",
    body: "One-time phone setting. You keep your number and carrier — only calls you don't answer reach us.",
  },
  {
    title: "Caller gets an instant text",
    body: "Within seconds, the caller gets a text from your business: “Sorry we missed you — reply here and we'll get right back to you.”",
  },
  {
    title: "You win the job",
    body: "Reply from a simple shared inbox. If they go quiet, Nullify sends one polite follow-up so the lead doesn't die.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <span className="text-lg font-bold tracking-tight">Nullify</span>
        <nav className="flex items-center gap-4 text-sm">
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
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
        <section className="flex flex-col items-center gap-6 py-24 text-center">
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Missed calls are lost jobs.
            <br />
            Nullify texts them back instantly.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            You&apos;re on a roof, under a sink, or with a customer — and the phone rings out.
            85% of callers who don&apos;t reach you call your competitor next. Nullify catches
            every missed call and turns it into a text conversation before they do.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/sign-up"
              className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Start your 14-day free trial
            </Link>
          </div>
          <p className="text-sm text-zinc-500">
            $49/month after trial. No contracts. 15-minute setup. Keep your number.
          </p>
        </section>

        <section className="grid gap-8 border-t border-zinc-200 py-16 sm:grid-cols-3 dark:border-zinc-800">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-zinc-400">Step {i + 1}</span>
              <h2 className="text-lg font-semibold">{step.title}</h2>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{step.body}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="mx-auto w-full max-w-5xl border-t border-zinc-200 px-6 py-8 text-sm text-zinc-500 dark:border-zinc-800">
        © {new Date().getFullYear()} Nullify
      </footer>
    </div>
  );
}
