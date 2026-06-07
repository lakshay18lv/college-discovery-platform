"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card, StatPill } from "@/components/ui";
import { College } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { ComparisonSaver } from "@/components/comparison-saver";

export function CompareBuilder({ colleges }: { colleges: College[] }) {
  const [selected, setSelected] = useState<string[]>([colleges[0]?.slug ?? "", colleges[1]?.slug ?? ""]);

  const selectedColleges = useMemo(
    () => colleges.filter((college) => selected.includes(college.slug)).slice(0, 3),
    [selected, colleges]
  );

  const compareRows = [
    {
      label: "Fees",
      render: (college: College) => formatCurrency(college.fees)
    },
    {
      label: "Rating",
      render: (college: College) => college.rating.toFixed(1)
    },
    {
      label: "Median package",
      render: (college: College) => college.placements.medianPackage
    },
    {
      label: "Placement rate",
      render: (college: College) => `${college.placements.placementRate}%`
    },
    {
      label: "Location",
      render: (college: College) => college.location
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {colleges.map((college) => {
            const active = selected.includes(college.slug);
            return (
              <button
                key={college.slug}
                type="button"
                onClick={() =>
                  setSelected((current) =>
                    current.includes(college.slug)
                      ? current.filter((slug) => slug !== college.slug)
                      : current.length < 3
                        ? [...current, college.slug]
                        : [current[1], college.slug]
                  )
                }
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  active
                    ? "border-brand-500 bg-brand-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <p className="font-semibold text-slate-900">{college.name}</p>
                <p className="text-sm text-slate-500">{college.location}</p>
              </button>
            );
          })}
        </div>
      </Card>

      {selectedColleges.length ? (
        <Card className="overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid" style={{ gridTemplateColumns: `220px repeat(${selectedColleges.length}, minmax(0, 1fr))` }}>
              <div className="p-4 text-sm font-semibold text-slate-500">Metric</div>
              {selectedColleges.map((college) => (
                <div key={college.slug} className="p-4">
                  <p className="text-base font-semibold text-slate-900">{college.name}</p>
                  <p className="text-sm text-slate-500">{college.location}</p>
                </div>
              ))}
            </div>

            {compareRows.map((row) => (
              <div
                key={row.label}
                className="grid border-t border-slate-200"
                style={{ gridTemplateColumns: `220px repeat(${selectedColleges.length}, minmax(0, 1fr))` }}
              >
                <div className="p-4 text-sm font-medium text-slate-600">{row.label}</div>
                {selectedColleges.map((college) => (
                  <div key={college.slug} className="p-4 text-sm text-slate-900">
                    {row.render(college)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      <ComparisonSaver slugs={selectedColleges.map((college) => college.slug)} />

      <div className="flex flex-wrap gap-3">
        {selectedColleges.map((college) => (
          <StatPill key={college.slug} label={college.name} value={college.placements.medianPackage} />
        ))}
        <Link href="/" className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          Add more colleges
        </Link>
      </div>
    </div>
  );
}
