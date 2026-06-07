import { NextResponse } from "next/server";
import { colleges } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const college = colleges.find((item) => item.slug === slug);

  if (!college) {
    return NextResponse.json({ error: "College not found" }, { status: 404 });
  }

  return NextResponse.json({ item: college });
}
