import { getSubscriptionForUser, isSubscriptionUsable } from "@/lib/billing";
import { SubscribeButton } from "@/components/subscribe-button";
import { requireSession } from "@/lib/session";

const stats = [
  { label: "Missed calls caught", value: "0" },
  { label: "Texts sent", value: "0" },
  { label: "Conversations started", value: "0" },
  { label: "Est. recovered revenue", value: "$0" },
];

const setupSteps = [
  {
    title: "Create your business profile",
    detail: "Your name, area code, and text-back wording.",
    status: "Coming soon",
  },
  {
    title: "Get your Nullify number",
    detail: "A local number your text-backs are sent from.",
    status: "Coming soon",
  },
  {
    title: "Register for SMS compliance (A2P)",
    detail: "We file it for you; carriers approve in 1–3 business days.",
    status: "Coming soon",
  },
  {
    title: "Set up call forwarding on your phone",
    detail: "One dial code — we show you the exact one for your carrier.",
    status: "Coming soon",
  },
];

export default async function DashboardPage() {
  const session = await requireSession();

  // Billing state; tolerate a missing/unreachable DB during early setup.
  let subscribed = false;
  try {
    const sub = await getSubscriptionForUser(session.user.id);
    subscribed = isSubscriptionUsable(sub?.status);
  } catch {
    subscribed = false;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight">
          Welcome, {session.user.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Here&apos;s what Nullify has rescued for you.
        </p>
      </div>

      {!subscribed && (
        <div className="flex flex-col gap-4 rounded-xl border border-orange-500/40 bg-gradient-to-r from-orange-500/10 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold">Your trial hasn&apos;t started yet</h2>
            <p className="mt-1 max-w-lg text-sm leading-6 text-zinc-400">
              Add billing to unlock setup. You won&apos;t be charged for 14 days,
              we&apos;ll email you before the trial ends, and cancelling during the
              trial costs $0.
            </p>
          </div>
          <SubscribeButton />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#2a3038] bg-[#10141a] p-5"
          >
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-2 font-mono text-3xl font-bold tabular-nums">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#2a3038] bg-[#10141a] p-6">
        <h2 className="font-bold">Setup checklist</h2>
        <p className="mt-1 text-sm text-zinc-500">
          About 15 minutes of your time, then Nullify works while you work.
        </p>
        <ul className="mt-5 flex flex-col gap-4">
          {setupSteps.map((step, i) => (
            <li
              key={step.title}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#161b22] font-mono text-xs font-bold text-orange-400">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-zinc-200">{step.title}</p>
                  <p className="mt-0.5 text-zinc-500">{step.detail}</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-[#2a3038] bg-[#0c0f14] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                {step.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
