import { requireSession } from "@/lib/session";

const stats = [
  { label: "Missed calls caught", value: "0" },
  { label: "Texts sent", value: "0" },
  { label: "Conversations started", value: "0" },
  { label: "Est. recovered revenue", value: "$0" },
];

const setupSteps = [
  { title: "Create your business profile", status: "Coming soon" },
  { title: "Get your Nullify number", status: "Coming soon" },
  { title: "Register for SMS compliance (A2P)", status: "Coming soon" },
  { title: "Set up call forwarding on your phone", status: "Coming soon" },
];

export default async function DashboardPage() {
  const session = await requireSession();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome, {session.user.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Here&apos;s what Nullify has rescued for you.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="font-semibold">Setup checklist</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {setupSteps.map((step, i) => (
            <li key={step.title} className="flex items-center justify-between text-sm">
              <span>
                <span className="mr-2 text-zinc-400">{i + 1}.</span>
                {step.title}
              </span>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-500 dark:bg-zinc-800">
                {step.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
