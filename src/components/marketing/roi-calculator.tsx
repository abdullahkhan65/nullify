"use client";

import { useState } from "react";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/**
 * Deliberately conservative math: we only claim winning back 1 in 10
 * missed callers. Underpromising is part of the trust story.
 */
export function RoiCalculator() {
  const [missedPerWeek, setMissedPerWeek] = useState(8);
  const [jobValue, setJobValue] = useState(350);

  const missedPerMonth = Math.round(missedPerWeek * 4.33);
  const atRisk = missedPerMonth * jobValue;
  const recoveredJobs = Math.max(1, Math.round(missedPerMonth * 0.1));
  const recovered = recoveredJobs * jobValue;
  const roi = Math.round(recovered / 49);

  const sliderClass = "w-full accent-orange-500";

  return (
    <div className="grid gap-10 rounded-2xl border border-[#2a3038] bg-[#10141a] p-8 sm:grid-cols-2">
      <div className="flex flex-col gap-8">
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="missed" className="text-sm font-medium text-zinc-300">
              Calls you miss per week
            </label>
            <span className="font-mono text-2xl font-bold text-zinc-100 tabular-nums">
              {missedPerWeek}
            </span>
          </div>
          <input
            id="missed"
            type="range"
            min={2}
            max={40}
            value={missedPerWeek}
            onChange={(e) => setMissedPerWeek(Number(e.target.value))}
            className={sliderClass}
          />
          <p className="mt-1 text-xs text-zinc-500">
            Industry studies put it at ~74% of all calls. Most owners guess low.
          </p>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="jobvalue" className="text-sm font-medium text-zinc-300">
              Your average job value
            </label>
            <span className="font-mono text-2xl font-bold text-zinc-100 tabular-nums">
              {fmt(jobValue)}
            </span>
          </div>
          <input
            id="jobvalue"
            type="range"
            min={50}
            max={2000}
            step={25}
            value={jobValue}
            onChange={(e) => setJobValue(Number(e.target.value))}
            className={sliderClass}
          />
          <p className="mt-1 text-xs text-zinc-500">
            Service call, repair, install — whatever a typical ticket looks like.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 rounded-xl border border-orange-500/25 bg-gradient-to-br from-[#161b22] to-[#1a1510] p-6">
        <div>
          <p className="text-sm text-zinc-400">
            Revenue that rang your phone and hung up, every month
          </p>
          <p className="mt-1 font-mono text-4xl font-bold tabular-nums text-red-400">
            {fmt(atRisk)}
          </p>
        </div>
        <div className="border-t border-[#2a3038] pt-4">
          <p className="text-sm text-zinc-400">
            If Nullify wins back just <strong className="text-zinc-200">1 in 10</strong> of
            those callers
          </p>
          <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-emerald-400">
            +{fmt(recovered)}/mo
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            That&apos;s {recoveredJobs} extra {recoveredJobs === 1 ? "job" : "jobs"} a month —{" "}
            <strong className="text-orange-400">{roi}×</strong>{" "}
            what Nullify costs. If it doesn&apos;t pay for itself, cancel in two
            clicks.
          </p>
        </div>
      </div>
    </div>
  );
}
