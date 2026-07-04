const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I have to change my phone number or carrier?",
    a: "No. You keep your number, your carrier, and your phone exactly as they are. You dial a one-time forwarding code so that only the calls you don't answer get sent to Nullify. Answer your phone like normal — we only exist for the calls you miss.",
  },
  {
    q: "What happens when I do answer the phone?",
    a: "Nothing. Nullify never touches a call you pick up. Conditional forwarding only kicks in when you're busy, out of range, or the call rings out.",
  },
  {
    q: "What does my customer actually see?",
    a: "A normal text message that reads like it came from you — your business name, your wording (you can edit every template), sent from your dedicated business texting number. No 'powered by' branding, no bot voice.",
  },
  {
    q: "Is automated texting even legal?",
    a: "Yes, when it's registered properly. US carriers require business texting to be registered under the actual business (it's called A2P 10DLC). Our setup wizard files that registration for your business — it's the same compliance the big platforms do, without you needing to know any of it.",
  },
  {
    q: "How long does setup really take?",
    a: "About 15 minutes of your time: create an account, answer a few questions about your business, and dial one forwarding code on your phone. Carrier compliance approval then takes 1–3 business days (that's the carriers, not us) — your trial doesn't meaningfully shrink while you wait.",
  },
  {
    q: "What if a customer texts back at 10pm?",
    a: "The instant text-back always goes out, so the customer feels heard. You decide how you're notified (email, text, or not at night), and you reply when you're ready. Leads wait a lot longer for a reply than they'll wait on a dead phone line.",
  },
  {
    q: "I already have someone answering phones. Why would I need this?",
    a: "For everything they can't catch: lunch, nights, weekends, sick days, and the second line ringing while they're on the first. Nullify is the safety net under whatever you already do.",
  },
  {
    q: "Can I turn it off whenever I want?",
    a: "Yes, two ways. Dial the forwarding-off code and your phone behaves like Nullify never existed. And you can cancel the subscription in two clicks from the dashboard — no call, no retention script, no contract. Your conversation history is exportable anytime.",
  },
  {
    q: "Do you do anything else with my customers' numbers?",
    a: "No. Your customer list is yours. We never text your customers on our own behalf, never sell or share numbers, and if you leave, you can take your data with you.",
  },
  {
    q: "What does it cost, exactly?",
    a: "$49/month flat after a 14-day free trial. That includes your business texting number, the compliance registration, and normal texting volume. No setup fee, no per-message surprises at typical volumes, no annual contract.",
  },
];

export function Faq() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
      {FAQS.map((item) => (
        <details
          key={item.q}
          className="group rounded-xl border border-[#2a3038] bg-[#10141a] px-5 py-4 open:border-orange-500/30 open:pb-5"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-200 [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="text-orange-500 transition-transform group-open:rotate-45">＋</span>
          </summary>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
