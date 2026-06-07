import { NextRequest, NextResponse } from "next/server";
import { filterColleges } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const result = filterColleges({
    q: searchParams.get("q") ?? undefined,
    location: searchParams.get("location") ?? undefined,
    exam: searchParams.get("exam") ?? undefined,
    maxFees: searchParams.get("maxFees") ? Number(searchParams.get("maxFees")) : undefined,
    minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined,
    sort: (searchParams.get("sort") as any) ?? "rating",
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    pageSize: searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : 6
  });

  return NextResponse.json(result);
}
