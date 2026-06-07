import { NextRequest, NextResponse } from "next/server";
import { recommendColleges } from "@/lib/utils";
import { PredictorInput } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as PredictorInput;

  if (!body.exam || typeof body.rank !== "number" || Number.isNaN(body.rank)) {
    return NextResponse.json(
      { error: "exam and rank are required" },
      { status: 400 }
    );
  }

  const items = recommendColleges(body);
  return NextResponse.json({ items });
}
