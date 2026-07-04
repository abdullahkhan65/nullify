import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Start your free trial — Nullify" };

const nextSteps = [
  { title: "Set up your business profile", detail: "Name, area code, and how your text-back should read. ~10 minutes." },
  { title: "We file your carrier registration", detail: "The A2P compliance paperwork, done for you. Approval takes 1–3 business days." },
  { title: "Dial one forwarding code", detail: "We hand you the exact code for your carrier. Ten seconds, reversible anytime." },
  { title: "Miss a call, watch it come back", detail: "Your first rescued conversation usually happens the same week." },
];

export default function SignUpPage() {
  return (
    <div className="mx-auto grid w-full max-w-5xl flex-1 items-center gap-14 px-6 py-12 lg:grid-cols-2">
      <div className="mx-auto lg:mx-0">
        <AuthForm mode="sign-up" />
        <p className="mt-4 max-w-sm text-xs leading-5 text-zinc-500">
          No charge today. Your 14-day trial starts when you add billing, and
          cancelling during the trial costs $0 — two clicks, no phone call.
        </p>
      </div>
      <div className="hidden flex-col gap-6 lg:flex">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-400">
          What happens next
        </p>
        {nextSteps.map((step, i) => (
          <div key={step.title} className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#161b22] font-mono text-xs font-bold text-orange-400">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-zinc-200">{step.title}</p>
              <p className="mt-1 text-sm leading-6 text-zinc-500">{step.detail}</p>
            </div>
          </div>
        ))}
        <p className="mt-2 border-t border-[#2a3038] pt-4 font-mono text-xs uppercase tracking-wider text-zinc-500">
          no contract · keep your number · cancel in two clicks
        </p>
      </div>
    </div>
  );
}
