"use client";

import { useState } from "react";

export function SubscribeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Could not start checkout");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start checkout");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={startCheckout}
        disabled={loading}
        className="rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-black hover:bg-orange-400 disabled:opacity-50"
      >
        {loading ? "Opening checkout…" : "Start your 14-day free trial"}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
