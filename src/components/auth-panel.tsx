"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui";

type MeState = {
  user: { id: string; name: string; email: string } | null;
};

export function AuthPanel() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [me, setMe] = useState<MeState["user"]>(null);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/auth/me");
      const data = (await response.json()) as MeState;
      setMe(data.user);
    }
    load();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const response = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? "Something went wrong");
      return;
    }

    setMe(data.user);
    setMessage(mode === "login" ? "Signed in successfully." : "Account created successfully.");
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setMe(null);
    setMessage("Signed out.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
      <Card>
        {me ? (
          <div className="space-y-4">
            <p className="text-sm font-medium text-brand-700">You are signed in.</p>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{me.name}</p>
              <p className="text-sm text-slate-500">{me.email}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Sign out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2 rounded-full bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${
                  mode === "signup" ? "bg-white text-slate-900 shadow" : "text-slate-600"
                }`}
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${
                  mode === "login" ? "bg-white text-slate-900 shadow" : "text-slate-600"
                }`}
              >
                Log in
              </button>
            </div>

            {mode === "signup" ? (
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
              />
            ) : null}
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Email"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
            />
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white"
            >
              {mode === "login" ? "Log in" : "Create account"}
            </button>
            {message ? <p className="text-sm text-slate-600">{message}</p> : null}
          </form>
        )}
      </Card>

      <Card className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Why this matters</h2>
        <ul className="space-y-3 text-sm leading-6 text-slate-600">
          <li>• Saved colleges can be linked to a real user session.</li>
          <li>• Discussion posts can be attributed to signed-in users.</li>
          <li>• The architecture is still simple enough to explain in a review.</li>
        </ul>
        <Link href="/saved" className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          Go to saved colleges
        </Link>
      </Card>
    </div>
  );
}
