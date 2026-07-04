"use client";

import { useEffect, useState } from "react";

/**
 * Plays the core product moment from the CUSTOMER's point of view:
 * she calls a plumber, nobody answers… and then the rescue text arrives.
 * Each step schedules the next; a replay button restarts the sequence.
 * (Decorative motion is disabled by CSS under prefers-reduced-motion.)
 */

const STEPS = {
  ringing: 0,
  missed: 1,
  textback: 2,
  typingReply: 3,
  reply: 4,
  typingAnswer: 5,
  answer: 6,
  booked: 7,
} as const;

const STEP_DURATION_MS: number[] = [2600, 1500, 2200, 1300, 2000, 1500, 2200];

function TypingBubble() {
  return (
    <div className="animate-msg-in flex max-w-[60px] items-center gap-1 self-start rounded-2xl rounded-bl-md bg-[#262d38] px-3 py-2.5">
      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-zinc-400" />
      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-zinc-400" />
      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-zinc-400" />
    </div>
  );
}

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
        className={`relative w-[300px] rounded-[2.6rem] border border-zinc-700 bg-zinc-900 p-2 shadow-[0_0_80px_-12px_rgba(16,185,129,0.35)] ${
          step === STEPS.ringing ? "animate-phone-buzz" : ""
        }`}
      >
        <div className="flex h-[580px] flex-col overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-[#151a22] to-[#0b0e13] text-zinc-50">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] text-zinc-400">
            <span className="font-medium">2:47 PM</span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-3 rounded-[2px] bg-zinc-500" />
              <span className="inline-block h-2 w-1 rounded-[1px] bg-zinc-500" />
              <span className="inline-block h-2.5 w-4 rounded-[3px] border border-zinc-500" />
            </span>
          </div>

          {step === STEPS.ringing && (
            <div className="flex flex-1 flex-col items-center px-6 pb-8 pt-10 text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                calling mobile…
              </p>
              <div className="relative mt-8">
                <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ring-pulse" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/30 to-emerald-600/30 text-4xl">
                  🔧
                </div>
              </div>
              <p className="mt-6 text-xl font-semibold">Dave&apos;s Plumbing</p>
              <p className="mt-1 text-sm text-zinc-400">Sacramento, CA</p>
              <p className="mt-6 max-w-[210px] text-xs leading-5 text-zinc-500">
                Sarah&apos;s water heater is leaking. Dave is under a sink across
                town and can&apos;t reach his phone.
              </p>
              <div className="mt-auto flex w-full items-center justify-center gap-14">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-xl">
                    ✕
                  </div>
                  <span className="text-[10px] text-zinc-500">End</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-xl">
                    ⌨
                  </div>
                  <span className="text-[10px] text-zinc-500">Keypad</span>
                </div>
              </div>
            </div>
          )}

          {step === STEPS.missed && (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
              <div className="w-full rounded-2xl border border-zinc-700/60 bg-zinc-800/70 p-4 text-left backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-lg">
                    📵
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Missed Call</p>
                    <p className="text-xs text-zinc-400">Dave&apos;s Plumbing · now</p>
                  </div>
                </div>
              </div>
              <p className="max-w-[220px] text-xs leading-5 text-zinc-500">
                This is the moment <span className="font-semibold text-red-400">85% of callers</span> give
                up and dial the next plumber on the list.
              </p>
            </div>
          )}

          {step >= STEPS.textback && (
            <div className="flex flex-1 flex-col px-3 pt-1">
              <div className="mb-2 flex flex-col items-center border-b border-zinc-800 pb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/40 to-emerald-600/40 text-sm">
                  🔧
                </div>
                <p className="mt-1 text-xs font-semibold">Dave&apos;s Plumbing</p>
                <p className="text-[10px] text-zinc-500">Text Message · SMS</p>
              </div>
              <div className="flex flex-1 flex-col gap-2 overflow-hidden text-[13px] leading-snug">
                <div className="animate-msg-in max-w-[86%] self-start rounded-2xl rounded-bl-md bg-[#262d38] px-3 py-2">
                  Hi, this is Dave&apos;s Plumbing — sorry we missed your call! We&apos;re
                  with a customer. Reply here and we&apos;ll get right back to you. 🛠️
                </div>
                <span className="-mt-1 pl-1 text-[10px] text-zinc-500">
                  2:47 PM · 9 seconds after the missed call
                </span>
                {step === STEPS.typingReply && <TypingBubble />}
                {step >= STEPS.reply && (
                  <div className="animate-msg-in max-w-[86%] self-end rounded-2xl rounded-br-md bg-emerald-600 px-3 py-2 text-white">
                    Oh great — my water heater is leaking! Can you come today?
                  </div>
                )}
                {step === STEPS.typingAnswer && <TypingBubble />}
                {step >= STEPS.answer && (
                  <div className="animate-msg-in max-w-[86%] self-start rounded-2xl rounded-bl-md bg-[#262d38] px-3 py-2">
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
              {/* Input bar */}
              <div className="mb-1 mt-2 flex items-center gap-2">
                <div className="flex-1 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs text-zinc-500">
                  Text message
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm text-white">
                  ↑
                </div>
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
        className="font-mono text-xs uppercase tracking-widest text-zinc-500 underline-offset-4 hover:text-orange-400 hover:underline"
      >
        ↺ watch it again
      </button>
    </div>
  );
}
