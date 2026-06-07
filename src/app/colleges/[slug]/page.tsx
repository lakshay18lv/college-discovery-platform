import { notFound } from "next/navigation";
import { colleges } from "@/lib/data";
import { Badge, Card, SectionHeading, StatPill } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return colleges.map((college) => ({ slug: college.slug }));
}

export default async function CollegeDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const college = colleges.find((item) => item.slug === slug);

  if (!college) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge>{college.type}</Badge>
        <SectionHeading title={college.name} description={college.overview} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
        <Card className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatPill label="Location" value={college.location} />
            <StatPill label="Fees" value={formatCurrency(college.fees)} />
            <StatPill label="Rating" value={college.rating.toFixed(1)} />
            <StatPill label="Established" value={String(college.established)} />
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Courses</h2>
            <div className="flex flex-wrap gap-2">
              {college.courses.map((course) => (
                <Badge key={course}>{course}</Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Placements</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <StatPill label="Median package" value={college.placements.medianPackage} />
              <StatPill label="Highest package" value={college.placements.highestPackage} />
              <StatPill label="Placement rate" value={`${college.placements.placementRate}%`} />
            </div>
            <p className="text-sm text-slate-600">
              Recruiters: {college.placements.recruiters.join(", ")}
            </p>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Key facts</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <StatPill label="Campus size" value={college.campus} />
              <StatPill label="NIRF rank" value={`#${college.stats.nirfRank}`} />
              <StatPill label="Hostels" value={college.stats.hostelAvailability ? "Available" : "Not available"} />
              <StatPill label="Student strength" value={college.stats.studentStrength} />
            </div>
            <div className="flex flex-wrap gap-2">
              {college.stats.examAccepted.map((exam) => (
                <Badge key={exam}>{exam}</Badge>
              ))}
            </div>
            {college.website ? (
              <a
                href={college.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Visit official site
              </a>
            ) : null}
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Student reviews</h2>
            <div className="space-y-3">
              {college.reviews.map((review) => (
                <div key={`${review.author}-${review.program}`} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{review.author}</p>
                      <p className="text-sm text-slate-500">{review.program}</p>
                    </div>
                    <p className="font-bold text-amber-700">{review.rating.toFixed(1)}</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{review.summary}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
