import Link from "next/link";
import { Badge, Card } from "@/components/ui";
import { College } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function CollegeCard({
  college,
  saved,
  onToggleSave
}: {
  college: College;
  saved?: boolean;
  onToggleSave?: (slug: string) => void;
}) {
  return (
    <Card className="flex h-full flex-col justify-between gap-4">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <Badge>{college.type}</Badge>
            <h3 className="text-xl font-semibold text-slate-900">{college.name}</h3>
            <p className="text-sm text-slate-500">{college.location}</p>
          </div>
          <div className="rounded-2xl bg-amber-50 px-3 py-2 text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-amber-700">Rating</p>
            <p className="text-lg font-bold text-amber-700">{college.rating.toFixed(1)}</p>
          </div>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-slate-600">{college.overview}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Annual fees</p>
            <p className="mt-1 font-semibold text-slate-900">{formatCurrency(college.fees)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Median package</p>
            <p className="mt-1 font-semibold text-slate-900">{college.placements.medianPackage}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/colleges/${college.slug}`}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          View details
        </Link>
        {onToggleSave ? (
          <button
            type="button"
            onClick={() => onToggleSave(college.slug)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              saved
                ? "bg-brand-100 text-brand-700 hover:bg-brand-200"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {saved ? "Saved" : "Save college"}
          </button>
        ) : null}
      </div>
    </Card>
  );
}
