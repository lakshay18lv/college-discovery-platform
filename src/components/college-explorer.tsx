"use client";

import { useEffect, useMemo, useState } from "react";
import { CollegeCard } from "@/components/college-card";
import { FilterBar, FilterState } from "@/components/filters";
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

export function CollegeExplorer({
  initialColleges,
  initialTotal
}: {
  initialColleges: College[];
  initialTotal: number;
}) {
  const [filters, setFilters] = useState<FilterState>({
    q: "",
    location: "",
    exam: "",
    maxFees: "",
    minRating: "",
    sort: "rating"
  });
  const [colleges, setColleges] = useState(initialColleges);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);

  const sessionId = useMemo(() => getSessionId(), []);

  useEffect(() => {
    async function loadSaved() {
      const response = await fetch(`/api/saved?sessionId=${sessionId}`);
      const data = await response.json();
      setSaved(data.items ?? []);
    }
    loadSaved();
  }, [sessionId]);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const searchParams = new URLSearchParams({
        q: filters.q,
        location: filters.location,
        exam: filters.exam,
        maxFees: filters.maxFees,
        minRating: filters.minRating,
        sort: filters.sort,
        page: String(page),
        pageSize: "6"
      });

      const response = await fetch(`/api/colleges?${searchParams.toString()}`);
      const data = await response.json();
      if (!active) return;
      setColleges((current) => (page === 1 ? data.items : [...current, ...data.items]));
      setTotal(data.total ?? 0);
      setLoading(false);
    }
    load();
    return () => {
      active = false;
    };
  }, [filters, page]);

  async function toggleSave(slug: string) {
    const response = await fetch("/api/saved", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-session-id": sessionId
      },
      body: JSON.stringify({ slug })
    });
    const data = await response.json();
    setSaved(data.items ?? []);
  }

  const hasMore = colleges.length < total;

  return (
    <div className="space-y-8">
      <FilterBar
        value={filters}
        onChange={(next) => {
          setFilters(next);
          setPage(1);
        }}
      />

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{colleges.length}</span> of{" "}
          <span className="font-semibold text-slate-900">{total}</span> colleges
        </p>
        <button
          type="button"
          onClick={() => {
            setFilters({
              q: "",
              location: "",
              exam: "",
              maxFees: "",
              minRating: "",
              sort: "rating"
            });
            setPage(1);
          }}
          className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
        >
          Reset filters
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {colleges.map((college) => (
          <CollegeCard
            key={college.slug}
            college={college}
            saved={saved.includes(college.slug)}
            onToggleSave={toggleSave}
          />
        ))}
      </div>

      {loading ? (
        <Card>
          <p className="text-sm text-slate-600">Loading colleges...</p>
        </Card>
      ) : null}

      {hasMore ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setPage((current) => current + 1)}
            className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Load more colleges
          </button>
        </div>
      ) : null}
    </div>
  );
}
