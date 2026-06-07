import { NextRequest, NextResponse } from "next/server";
import { compareColleges } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { slugs?: string[] };
  const items = compareColleges(body.slugs ?? []);
  return NextResponse.json({ items });
}
