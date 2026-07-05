"use client";

import { useEffect, useRef, useState } from "react";
import { StatCounter } from "@/components/marketing/stat-counter";

/**
 * Auto-playing motion-graphic "demo reel" of the rescue story — the code
 * equivalent of a promo video, with no video file to load. Playback starts
 * when scrolled into view and loops after holding on the end card. Under
 * prefers-reduced-motion it shows the final "booked" frame as a static scene.
 */

const SCENES = [
  { ts: "2:47:03 PM", label: "Incoming call", durationMs: 2600 },
  { ts: "2:47:24 PM", label: "Missed", durationMs: 2300 },
  { ts: "2:47:33 PM", label: "Nullify texts back", durationMs: 2600 },
  { ts: "2:48:11 PM", label: "Sarah replies", durationMs: 2200 },
  { ts: "3:04 PM", label: "You answer", durationMs: 2200 },
  { ts: "3:58 PM", label: "Job booked", durationMs: 3200 },
  { ts: "4:00 PM", label: "Replay", durationMs: 3600 },
] as const;

const BOOKED = 5;

function CustomerBubble({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <div className="flex w-full max-w-md flex-col items-end gap-1.5">
      <div className="animate-msg-in rounded-2xl rounded-br-md bg-emerald-600 px-4 py-2.5 text-left text-sm leading-6 text-white">
        {children}
      </div>
      <span className="font-mono text-[11px] text-zinc-500">{caption}</span>
    </div>
  );
}

function BusinessBubble({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <div className="flex w-full max-w-md flex-col items-start gap-1.5">
      <div className="animate-msg-in rounded-2xl rounded-bl-md bg-[#262d38] px-4 py-2.5 text-left text-sm leading-6 text-zinc-100">
        {children}
      </div>
      <span className="font-mono text-[11px] text-zinc-500">{caption}</span>
    </div>
  );
}

export function RescueCinematic() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (reduced) setStep(BOOKED);
        else setPlaying(true);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(
      () => setStep((s) => (s + 1) % SCENES.length),
      SCENES[step].durationMs,
    );
    return () => clearTimeout(t);
  }, [playing, step]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-[#2a3038] bg-[#0c0f14] shadow-[0_0_60px_-16px_rgba(249,115,22,0.5)]"
    >
      <div className="safety-stripes h-1.5" />

      {/* Chrome: live label + scene clock */}
      <div className="flex items-center justify-between border-b border-[#2a3038] px-4 py-2.5 sm:px-6">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ring-pulse rounded-full bg-orange-500/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>
          Live rescue · Tuesday
        </span>
        <span className="font-mono text-[11px] text-zinc-500">{SCENES[step].ts}</span>
      </div>
      <div
        className="h-0.5 bg-orange-500 transition-all duration-500 ease-out"
        style={{ width: `${((step + 1) / SCENES.length) * 100}%` }}
      />

      {/* Screen-reader alternative to the animated scenes */}
      <p className="sr-only">
        Sarah calls about a leaking water heater at 2:47 PM and gets no answer.
        Nine seconds later, Nullify texts her back as the business. She replies,
        the owner answers from his truck, and by 3:58 PM the job is booked —
        $450 rescued.
      </p>

      {/* Stage */}
      <div
        aria-hidden="true"
        className="bg-blueprint flex h-[340px] items-center justify-center px-6 sm:h-[380px]"
      >
        {step === 0 && (
          <div key="ringing" className="animate-msg-in flex flex-col items-center gap-5 text-center">
            <div className="relative">
              <span className="absolute inset-0 animate-ring-pulse rounded-full bg-emerald-500/40" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/30 to-emerald-600/30 text-3xl">
                📞
              </div>
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight sm:text-3xl">Sarah is calling</p>
              <p className="mt-1 text-zinc-400">Water heater leaking — she needs someone today</p>
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
              You: under a sink across town
            </p>
          </div>
        )}

        {step === 1 && (
          <div key="missed" className="animate-msg-in flex flex-col items-center gap-5 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-500/60 bg-red-500/10 text-3xl">
              📵
            </div>
            <p className="text-2xl font-black tracking-tight text-red-400 sm:text-3xl">
              Missed call. No voicemail.
            </p>
            <p className="max-w-sm text-sm leading-6 text-zinc-400">
              This is where <span className="font-semibold text-red-400">85%</span> of callers give
              up and dial the next name on Google.
            </p>
          </div>
        )}

        {step === 2 && (
          <div key="textback" className="flex w-full flex-col items-center gap-5">
            <p className="animate-msg-in font-mono text-sm font-bold uppercase tracking-[0.25em] text-orange-400">
              +9 seconds
            </p>
            <BusinessBubble caption="sent automatically, in your words">
              Hi, this is Dave&apos;s Plumbing — sorry we missed your call! We&apos;re with a
              customer. Reply here and we&apos;ll get right back to you. 🛠️
            </BusinessBubble>
          </div>
        )}

        {step === 3 && (
          <div key="reply" className="flex w-full flex-col items-center">
            <CustomerBubble caption="Sarah · 38 seconds after the text-back">
              Oh great — my water heater is leaking! Can you come today?
            </CustomerBubble>
          </div>
        )}

        {step === 4 && (
          <div key="answer" className="flex w-full flex-col items-center">
            <BusinessBubble caption="you · from the truck, between jobs">
              Absolutely. I can be there between 3–4pm. Text me your address and
              I&apos;ll head over after this job.
            </BusinessBubble>
          </div>
        )}

        {step === 5 && (
          <div key="booked" className="animate-msg-in flex flex-col items-center gap-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
              ✓ Job booked
            </p>
            <p className="text-5xl font-black tracking-tight text-emerald-400 sm:text-6xl">
              $<StatCounter value={450} /> rescued
            </p>
            <p className="max-w-sm text-sm leading-6 text-zinc-400">
              Money that was headed to the next name on Google.
            </p>
          </div>
        )}

        {step === 6 && (
          <div key="end" className="animate-msg-in flex flex-col items-center gap-4 text-center">
            <p className="text-3xl font-black tracking-tight sm:text-4xl">That was Nullify.</p>
            <p className="max-w-sm text-zinc-400">
              Every missed call gets this exact rescue — automatically.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-600">
              replaying…
            </p>
          </div>
        )}
      </div>

      {/* Scene dots */}
      <div className="flex items-center justify-center gap-2 border-t border-[#2a3038] px-4 py-3">
        {SCENES.map((scene, i) => (
          <button
            key={scene.label}
            onClick={() => setStep(i)}
            aria-label={`Scene ${i + 1}: ${scene.label}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step
                ? "w-6 bg-orange-500"
                : i < step
                  ? "w-3 bg-zinc-600 hover:bg-zinc-500"
                  : "w-3 bg-zinc-800 hover:bg-zinc-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
