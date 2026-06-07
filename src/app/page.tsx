import { CollegeExplorer } from "@/components/college-explorer";
import { SectionHeading, Card, Badge } from "@/components/ui";
import { colleges } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft lg:grid-cols-[1.25fr,0.75fr] lg:p-10">
        <div className="space-y-6">
          <Badge>Track B · College Discovery Platform</Badge>
          <SectionHeading
            title="Find the right college without tab-hopping."
            description="Search colleges, compare options side-by-side, and use a rank-aware predictor to build a shortlist that actually feels useful."
          />
          <div className="flex flex-wrap gap-3">
            <a href="#explore" className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white">
              Explore colleges
            </a>
            <a href="/compare" className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
              Compare colleges
            </a>
            <a href="/discuss" className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
              Ask questions
            </a>
          </div>
        </div>
        <Card className="space-y-4 bg-white text-slate-900">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-700">What’s inside</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Colleges indexed</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{colleges.length}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Comparison fields</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">5+</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Predictor inputs</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">Rank + exam</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Saved shortlist</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">Persistent</p>
            </div>
          </div>
        </Card>
      </section>

      <section id="explore" className="space-y-5">
        <SectionHeading
          eyebrow="Discover"
          title="Browse colleges with filters that matter."
          description="Filter by exam, location, fees, and rating. The results come from the API so the search layer is easy to extend later."
        />
        <CollegeExplorer initialColleges={colleges.slice(0, 6)} initialTotal={colleges.length} />
      </section>
    </div>
  );
}
