"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { CollegeCard } from "@/components/college-card";
import { Card } from "@/components/ui";
import { College } from "@/lib/types";

export function PredictorForm({
  initialRecommendations = []
}: {
  initialRecommendations?: Array<{ college: College; score: number }>;
}) {
  const [exam, setExam] = useState("JEE Main");
  const [rank, setRank] = useState("12000");
  const [preferredLocation, setPreferredLocation] = useState("Delhi");
  const [budget, setBudget] = useState("250000");
  const [results, setResults] = useState(initialRecommendations);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/predictor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam,
          rank: Number(rank),
          preferredLocation,
          budget: Number(budget)
        })
      });
      const data = await response.json();
      setResults(data.items ?? []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px,1fr]">
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Exam</label>
            <input
              value={exam}
              onChange={(event) => setExam(event.target.value)}
              placeholder="JEE Main"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Rank</label>
            <input
              value={rank}
              onChange={(event) => setRank(event.target.value)}
              type="number"
              min={1}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Preferred location</label>
            <input
              value={preferredLocation}
              onChange={(event) => setPreferredLocation(event.target.value)}
              placeholder="Delhi"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Budget ceiling</label>
            <input
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              type="number"
              min={0}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            {loading ? "Finding matches..." : "Recommend colleges"}
          </button>
        </form>
      </Card>

      <div className="grid gap-4">
        {results.length ? (
          results.map(({ college, score }) => (
            <div key={college.slug} className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700">
                <span>Match score</span>
                <span>{Math.round(score)}</span>
              </div>
              <CollegeCard college={college} />
            </div>
          ))
        ) : (
          <Card>
            <p className="text-sm text-slate-600">
              Submit your exam rank to get a shortlist based on exam match, affordability, and placement strength.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
