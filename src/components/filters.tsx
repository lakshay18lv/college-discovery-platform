"use client";

import { useMemo } from "react";

const locations = ["", "Delhi", "Karnataka", "Maharashtra", "Rajasthan", "Tamil Nadu"];
const exams = ["", "JEE Main", "JEE Advanced", "BITSAT", "GATE", "CAT", "MET", "AEEE", "PESSAT"];

export type FilterState = {
  q: string;
  location: string;
  exam: string;
  maxFees: string;
  minRating: string;
  sort: string;
};

export function FilterBar({
  value,
  onChange
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const maxFeesOptions = useMemo(
    () => ["", "100000", "250000", "400000", "500000"],
    []
  );

  return (
    <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft lg:grid-cols-6">
      <input
        value={value.q}
        onChange={(event) => onChange({ ...value, q: event.target.value })}
        placeholder="Search colleges, courses, recruiters..."
        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 transition focus:border-brand-500"
      />
      <select
        value={value.location}
        onChange={(event) => onChange({ ...value, location: event.target.value })}
        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
      >
        <option value="">All locations</option>
        {locations.slice(1).map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <select
        value={value.exam}
        onChange={(event) => onChange({ ...value, exam: event.target.value })}
        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
      >
        <option value="">All exams</option>
        {exams.slice(1).map((exam) => (
          <option key={exam} value={exam}>
            {exam}
          </option>
        ))}
      </select>
      <select
        value={value.maxFees}
        onChange={(event) => onChange({ ...value, maxFees: event.target.value })}
        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
      >
        <option value="">Any fees</option>
        {maxFeesOptions.slice(1).map((fees) => (
          <option key={fees} value={fees}>
            Up to ₹{Number(fees).toLocaleString("en-IN")}
          </option>
        ))}
      </select>
      <select
        value={value.minRating}
        onChange={(event) => onChange({ ...value, minRating: event.target.value })}
        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
      >
        <option value="">Any rating</option>
        <option value="4.6">4.6+</option>
        <option value="4.4">4.4+</option>
        <option value="4.2">4.2+</option>
        <option value="4.0">4.0+</option>
      </select>
      <select
        value={value.sort}
        onChange={(event) => onChange({ ...value, sort: event.target.value })}
        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
      >
        <option value="rating">Sort by rating</option>
        <option value="fees-asc">Fees low to high</option>
        <option value="fees-desc">Fees high to low</option>
        <option value="name">Name A-Z</option>
      </select>
    </div>
  );
}
