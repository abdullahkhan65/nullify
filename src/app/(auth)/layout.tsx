import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blueprint flex flex-1 flex-col bg-[#0c0f14] text-zinc-100">
      <div className="safety-stripes h-1.5 w-full" />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-orange-500 font-mono text-sm font-black text-black">
            N
          </span>
          Nullify
        </Link>
        <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-100">
          ← Back to site
        </Link>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
