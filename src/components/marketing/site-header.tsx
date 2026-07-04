import Link from "next/link";

export function SiteHeader() {
  return (
    <>
      <div className="safety-stripes h-1.5 w-full" />
      <header className="sticky top-0 z-40 border-b border-[#2a3038] bg-[#0c0f14]/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-orange-500 font-mono text-sm font-black text-black">
              N
            </span>
            Nullify
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/how-it-works" className="hidden text-zinc-400 hover:text-zinc-100 sm:block">
              How it works
            </Link>
            <Link href="/pricing" className="hidden text-zinc-400 hover:text-zinc-100 sm:block">
              Pricing
            </Link>
            <Link href="/#faq" className="hidden text-zinc-400 hover:text-zinc-100 md:block">
              FAQ
            </Link>
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
    </>
  );
}
