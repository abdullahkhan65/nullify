"use client";

import { useEffect, useState } from "react";

/**
 * Plays the core product moment from the CUSTOMER's point of view:
 * they call a plumber, nobody answers… and then the rescue text arrives.
 * Each step schedules the next; a replay button restarts the sequence.
 * (Decorative motion is disabled by CSS under prefers-reduced-motion.)
 */

const STEPS = {
  ringing: 0,
  missed: 1,
  textback: 2,
  reply: 3,
  answer: 4,
  booked: 5,
} as const;

const STEP_DURATION_MS: number[] = [2600, 1400, 2200, 2200, 2200];

export function PhoneDemo() {
  const [step, setStep] = useState<number>(STEPS.ringing);

  useEffect(() => {
    if (step >= STEP_DURATION_MS.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), STEP_DURATION_MS[step]);
    return () => clearTimeout(t);
  }, [step]);

  const replay = () => setStep(STEPS.ringing);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Phone frame */}
      <div
        className={`relative w-[290px] rounded-[2.4rem] border border-zinc-300 bg-zinc-900 p-2 shadow-2xl dark:border-zinc-700 ${
          step === STEPS.ringing ? "animate-phone-buzz" : ""
        }`}
      >
        <div className="flex h-[560px] flex-col overflow-hidden rounded-[2rem] bg-zinc-950 text-zinc-50">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] text-zinc-400">
            <span>2:47 PM</span>
            <span className="tracking-widest">●●●●</span>
          </div>

          {step === STEPS.ringing && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ring-pulse" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 text-2xl">
                  🔧
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">Dave&apos;s Plumbing</p>
                <p className="mt-1 text-sm text-zinc-400">calling…</p>
              </div>
              <p className="max-w-[200px] text-xs text-zinc-500">
                Sarah&apos;s water heater is leaking. Dave is under a sink across town.
              </p>
            </div>
          )}

          {step === STEPS.missed && (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/15 text-3xl">
                📵
              </div>
              <div>
                <p className="text-lg font-semibold text-red-400">No answer</p>
                <p className="mt-1 max-w-[210px] text-xs text-zinc-500">
                  This is the moment 85% of callers give up and dial the next
                  plumber on the list.
                </p>
              </div>
            </div>
          )}

          {step >= STEPS.textback && (
            <div className="flex flex-1 flex-col px-3 pt-2">
              <div className="mb-2 border-b border-zinc-800 pb-2 text-center">
                <p className="text-xs font-semibold">Dave&apos;s Plumbing</p>
                <p className="text-[10px] text-zinc-500">Text message</p>
              </div>
              <div className="flex flex-1 flex-col gap-2 overflow-hidden text-[13px] leading-snug">
                <div className="animate-msg-in max-w-[85%] self-start rounded-2xl rounded-bl-md bg-zinc-800 px-3 py-2">
                  Hi, this is Dave&apos;s Plumbing — sorry we missed your call! We&apos;re
                  with a customer. Reply here and we&apos;ll get right back to you. 🛠️
                  <span className="mt-1 block text-[10px] text-zinc-500">
                    2:47 PM · 9 seconds after the missed call
                  </span>
                </div>
                {step >= STEPS.reply && (
                  <div className="animate-msg-in max-w-[85%] self-end rounded-2xl rounded-br-md bg-emerald-600 px-3 py-2 text-white">
                    Oh great — my water heater is leaking! Can you come today?
                  </div>
                )}
                {step >= STEPS.answer && (
                  <div className="animate-msg-in max-w-[85%] self-start rounded-2xl rounded-bl-md bg-zinc-800 px-3 py-2">
                    Absolutely. I can be there between 3–4pm. Text me your address
                    and I&apos;ll head over after this job.
                  </div>
                )}
                {step >= STEPS.booked && (
                  <div className="animate-msg-in mt-2 self-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
                    ✓ Job booked — $450
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Home indicator */}
          <div className="flex justify-center pb-2 pt-1">
            <div className="h-1 w-24 rounded-full bg-zinc-700" />
          </div>
        </div>
      </div>

      <button
        onClick={replay}
        className="text-sm text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline dark:hover:text-zinc-100"
      >
        ↺ Watch it again
      </button>
    </div>
  );
}
