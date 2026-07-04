/** Static illustration of the owner's side of Nullify — the inbox and the
 * numbers. Pure markup, no interactivity; framed as a browser window. */

const conversations = [
  {
    initials: "SM",
    name: "(916) 555-0142",
    preview: "Oh great — my water heater is leaking! Can…",
    time: "2:47 PM",
    badge: "new",
    active: true,
  },
  {
    initials: "JR",
    name: "(916) 555-0187",
    preview: "You: No problem, see you Thursday at 9.",
    time: "11:20 AM",
    badge: "booked",
    active: false,
  },
  {
    initials: "TB",
    name: "(279) 555-0034",
    preview: "Nullify: Hi again from Dave's Plumbing — still…",
    time: "Yesterday",
    badge: "follow-up",
    active: false,
  },
];

const badgeStyles: Record<string, string> = {
  new: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  booked: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "follow-up": "bg-zinc-500/15 text-zinc-400 border-zinc-600",
};

export function OwnerInboxMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#2a3038] bg-[#10141a] shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-[#2a3038] bg-[#161b22] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 rounded-md bg-[#0c0f14] px-3 py-1 text-center font-mono text-[11px] text-zinc-500">
          app.nullify.com/inbox
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 divide-x divide-[#2a3038] border-b border-[#2a3038] text-center">
        {[
          { label: "Calls caught · Nov", value: "23" },
          { label: "Reply rate", value: "71%" },
          { label: "Est. recovered", value: "$2,340" },
        ].map((s) => (
          <div key={s.label} className="px-2 py-3">
            <p className="font-mono text-lg font-bold text-emerald-400">{s.value}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-zinc-500">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Inbox split view */}
      <div className="grid sm:grid-cols-[240px_1fr]">
        <div className="hidden flex-col divide-y divide-[#2a3038] border-r border-[#2a3038] sm:flex">
          {conversations.map((c) => (
            <div
              key={c.name}
              className={`flex items-start gap-2.5 px-3 py-3 ${c.active ? "bg-[#181f29]" : ""}`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#262d38] text-[10px] font-bold text-zinc-300">
                {c.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-semibold text-zinc-200">{c.name}</p>
                  <span className="shrink-0 text-[9px] text-zinc-500">{c.time}</span>
                </div>
                <p className="mt-0.5 truncate text-[11px] text-zinc-500">{c.preview}</p>
                <span
                  className={`mt-1 inline-block rounded-full border px-1.5 py-px text-[9px] font-medium ${badgeStyles[c.badge]}`}
                >
                  {c.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 p-4 text-[12px] leading-snug">
          <div className="self-center rounded-full bg-[#161b22] px-3 py-1 text-[10px] text-zinc-500">
            📵 Missed call · 2:47 PM · voicemail attached (0:12)
          </div>
          <div className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-[#262d38] px-3 py-2 text-zinc-200">
            Hi, this is Dave&apos;s Plumbing — sorry we missed your call! We&apos;re with
            a customer. Reply here and we&apos;ll get right back to you. 🛠️
            <span className="mt-1 block text-[9px] text-zinc-500">
              auto text-back · sent 9s after the call
            </span>
          </div>
          <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-emerald-600/90 px-3 py-2 text-white">
            Oh great — my water heater is leaking! Can you come today?
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex-1 rounded-full border border-[#2a3038] bg-[#0c0f14] px-3 py-1.5 text-[11px] text-zinc-500">
              Reply when you&apos;re free — the lead waits here
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
              ↑
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
