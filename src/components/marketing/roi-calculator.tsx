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

  const sliderClass = "w-full accent-emerald-600";

  return (
    <div className="grid gap-10 rounded-2xl border border-zinc-200 bg-white p-8 sm:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-8">
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="missed" className="text-sm font-medium">
              Calls you miss per week
            </label>
            <span className="text-2xl font-semibold tabular-nums">{missedPerWeek}</span>
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
            <label htmlFor="jobvalue" className="text-sm font-medium">
              Your average job value
            </label>
            <span className="text-2xl font-semibold tabular-nums">{fmt(jobValue)}</span>
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

      <div className="flex flex-col justify-center gap-4 rounded-xl bg-zinc-50 p-6 dark:bg-zinc-950">
        <div>
          <p className="text-sm text-zinc-500">
            Revenue that rang your phone and hung up, every month
          </p>
          <p className="mt-1 text-4xl font-bold tabular-nums text-red-600 dark:text-red-400">
            {fmt(atRisk)}
          </p>
        </div>
        <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">
            If Nullify wins back just <strong>1 in 10</strong> of those callers
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
            +{fmt(recovered)}/mo
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            That&apos;s {recoveredJobs} extra {recoveredJobs === 1 ? "job" : "jobs"} a month —{" "}
            <strong>{roi}×</strong> what Nullify costs. If it doesn&apos;t pay for
            itself, cancel in two clicks.
          </p>
        </div>
      </div>
    </div>
  );
}
