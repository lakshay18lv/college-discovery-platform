"use client";

import { useEffect, useState } from "react";
import { CollegeCard } from "@/components/college-card";
import { Card } from "@/components/ui";
import { College } from "@/lib/types";

const sessionKey = "cdp-session-id";

function getSessionId() {
  if (typeof window === "undefined") return "server";
  const existing = window.localStorage.getItem(sessionKey);
  if (existing) return existing;
  const next = crypto.randomUUID();
  window.localStorage.setItem(sessionKey, next);
  return next;
}

export function SavedList() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const sessionId = getSessionId();

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/saved/details?sessionId=${sessionId}`);
      const data = await response.json();
      setColleges(data.items ?? []);
      setLoading(false);
    }
    load();
  }, [sessionId]);

  if (loading) {
    return <Card><p className="text-sm text-slate-600">Loading saved colleges...</p></Card>;
  }

  if (!colleges.length) {
    return (
      <Card>
        <p className="text-sm text-slate-600">
          You haven’t saved any colleges yet. Go back to discovery and shortlist a few options.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {colleges.map((college) => (
        <CollegeCard key={college.slug} college={college} />
      ))}
    </div>
  );
}
