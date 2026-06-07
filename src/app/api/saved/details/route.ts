import { NextRequest, NextResponse } from "next/server";
import { colleges } from "@/lib/data";
import { getSavedForSession } from "@/lib/store";
import { getUserFromSession } from "@/lib/auth-store";
import { readAuthCookie } from "@/lib/session";

async function getOwnerKey(request: NextRequest) {
  const authUser = await getUserFromSession(await readAuthCookie());
  if (authUser) {
    return `user:${authUser.id}`;
  }

  return request.nextUrl.searchParams.get("sessionId") ?? "default";
}

export async function GET(request: NextRequest) {
  const ownerKey = await getOwnerKey(request);
  const items = await getSavedForSession(ownerKey);
  const savedColleges = colleges.filter((college) => items.includes(college.slug));
  return NextResponse.json({ items: savedColleges });
}
