import Link from "next/link";

const productLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#calculator", label: "Missed-call calculator" },
  { href: "/#faq", label: "FAQ" },
];

const startLinks = [
  { href: "/sign-up", label: "Start free trial" },
  { href: "/sign-in", label: "Sign in" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#2a3038] bg-[#0c0f14]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <span className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-orange-500 font-mono text-sm font-black text-black">
              N
            </span>
            Nullify
          </span>
          <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-500">
            Missed calls are lost jobs. Nullify texts every missed caller back in
            seconds — so the conversation starts with you, not your competitor.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Product</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-zinc-400 hover:text-zinc-100">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Get started</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {startLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-zinc-400 hover:text-zinc-100">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 text-zinc-500">
              Questions? Every support email is answered by the founder.
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#2a3038]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-sm text-zinc-500">
          <span>© {new Date().getFullYear()} Nullify</span>
          <span className="font-mono text-xs uppercase tracking-wider">
            Never lose a missed call again
          </span>
        </div>
      </div>
    </footer>
  );
}
