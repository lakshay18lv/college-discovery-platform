"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui";

const sessionKey = "cdp-session-id";

function getSessionId() {
  if (typeof window === "undefined") return "server";
  const existing = window.localStorage.getItem(sessionKey);
  if (existing) return existing;
  const next = crypto.randomUUID();
  window.localStorage.setItem(sessionKey, next);
  return next;
}

export function ComparisonSaver({ slugs }: { slugs: string[] }) {
  const [title, setTitle] = useState("My comparison");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedComparisons, setSavedComparisons] = useState<Array<{ id: string; title: string }>>([]);
  const sessionId = getSessionId();

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/comparisons?sessionId=${sessionId}`);
      const data = await response.json();
      setSavedComparisons((data.items ?? []).map((item: any) => ({ id: item.id, title: item.title })));
    }
    load();
  }, [sessionId]);

  async function saveCurrentComparison() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/comparisons", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-session-id": sessionId },
        body: JSON.stringify({ title, slugs })
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error ?? "Unable to save comparison");
        return;
      }
      setSavedComparisons((current) => [
        { id: data.item.id, title: data.item.title },
        ...current
      ]);
      setMessage("Comparison saved.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Save this comparison</h3>
          <p className="text-sm text-slate-600">Keep shortlisted college sets for later review.</p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          {slugs.length} colleges selected
        </span>
      </div>

      <div className="flex gap-3">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="min-w-0 flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
          placeholder="Comparison title"
        />
        <button
          type="button"
          onClick={saveCurrentComparison}
          disabled={loading || slugs.length < 2}
          className="rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {message ? <p className="text-sm text-slate-600">{message}</p> : null}

      {savedComparisons.length ? (
        <div className="space-y-2 border-t border-slate-200 pt-4">
          <p className="text-sm font-semibold text-slate-900">Saved comparisons</p>
          <div className="flex flex-wrap gap-2">
            {savedComparisons.map((comparison) => (
              <span
                key={comparison.id}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {comparison.title}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </Card>
  );
}
