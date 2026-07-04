import Link from "next/link";
import { SignOutButton } from "@/components/sign-out-button";
import { requireSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSession();

  return (
    <div className="flex flex-1 flex-col bg-[#0c0f14] text-zinc-100">
      <div className="safety-stripes h-1 w-full" />
      <header className="border-b border-[#2a3038] bg-[#0c0f14]">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-orange-500 font-mono text-sm font-black text-black">
              N
            </span>
            Nullify
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <span className="hidden font-mono text-xs uppercase tracking-wider text-zinc-600 sm:block">
              Dashboard
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
