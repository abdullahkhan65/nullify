"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result =
      mode === "sign-up"
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

    setLoading(false);
    if (result.error) {
      setError(result.error.message ?? "Something went wrong");
      return;
    }
    router.push("/dashboard");
  }

  const inputClass =
    "w-full rounded-lg border border-[#2a3038] bg-[#0c0f14] px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-orange-500/60";

  return (
    <div className="w-full max-w-sm rounded-2xl border border-[#2a3038] bg-[#10141a] p-8">
      <h1 className="text-2xl font-black tracking-tight">
        {mode === "sign-up" ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        {mode === "sign-up"
          ? "14 days free. Cancel in two clicks."
          : "Your inbox is waiting."}
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {mode === "sign-up" && (
          <input
            className={inputClass}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          className={inputClass}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Password (8+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-orange-500 px-4 py-2.5 font-semibold text-black hover:bg-orange-400 disabled:opacity-50"
        >
          {loading
            ? "One moment…"
            : mode === "sign-up"
              ? "Start free trial"
              : "Sign in"}
        </button>
      </form>
      <p className="mt-4 text-sm text-zinc-500">
        {mode === "sign-up" ? (
          <>
            Already have an account?{" "}
            <Link href="/sign-in" className="text-orange-400 underline underline-offset-4">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link href="/sign-up" className="text-orange-400 underline underline-offset-4">
              Create an account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
