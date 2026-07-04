import Link from "next/link";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

/* All marketing pages share the committed dark industrial look. */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col bg-[#0c0f14] text-zinc-100">
      <SiteHeader />
      <main className="flex flex-1 flex-col pb-16 sm:pb-0">{children}</main>
      <SiteFooter />
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
