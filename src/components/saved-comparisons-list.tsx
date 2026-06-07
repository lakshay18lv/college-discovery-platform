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

type SavedComparison = {
  id: string;
  title: string;
  slugs: string[];
  createdAt: string;
};

export function SavedComparisonsList() {
  const [items, setItems] = useState<SavedComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const sessionId = getSessionId();

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/comparisons?sessionId=${sessionId}`);
      const data = await response.json();
      setItems(data.items ?? []);
      setLoading(false);
    }
    load();
  }, [sessionId]);

  if (loading) {
    return (
      <Card>
        <p className="text-sm text-slate-600">Loading saved comparisons...</p>
      </Card>
    );
  }

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Saved comparisons</h2>
      {!items.length ? (
        <p className="text-sm text-slate-600">
          You haven’t saved any comparison yet. Open the compare page and save one.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="text-sm text-slate-500">{item.slugs.length} colleges compared</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
