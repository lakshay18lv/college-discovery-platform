import { NextRequest, NextResponse } from "next/server";
import { getSavedForSession, toggleSavedCollege } from "@/lib/store";
import { colleges } from "@/lib/data";
import { getUserFromSession } from "@/lib/auth-store";
import { readAuthCookie } from "@/lib/session";

async function getOwnerKey(request: NextRequest) {
  const authUser = await getUserFromSession(await readAuthCookie());
  if (authUser) {
    return `user:${authUser.id}`;
  }

  return request.headers.get("x-session-id") ?? request.nextUrl.searchParams.get("sessionId") ?? "default";
}

export async function GET(request: NextRequest) {
  const ownerKey = await getOwnerKey(request);
  const items = await getSavedForSession(ownerKey);
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const ownerKey = await getOwnerKey(request);
  const body = (await request.json()) as { slug?: string };

  if (!body.slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const items = await toggleSavedCollege(ownerKey, body.slug);
  const collegesSaved = colleges.filter((college) => items.includes(college.slug));
  return NextResponse.json({ items, colleges: collegesSaved });
}
