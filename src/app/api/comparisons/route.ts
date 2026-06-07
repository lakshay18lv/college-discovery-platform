import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth-store";
import { readAuthCookie } from "@/lib/session";
import { getComparisonsForOwner, saveComparison } from "@/lib/comparison-store";

async function getOwnerKey(request: NextRequest) {
  const authUser = await getUserFromSession(await readAuthCookie());
  if (authUser) {
    return `user:${authUser.id}`;
  }
  return request.nextUrl.searchParams.get("sessionId") ?? "default";
}

export async function GET(request: NextRequest) {
  const ownerKey = await getOwnerKey(request);
  const items = await getComparisonsForOwner(ownerKey);
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const ownerKey = await getOwnerKey(request);
  const body = (await request.json()) as { title?: string; slugs?: string[] };

  if (!body.title || !Array.isArray(body.slugs) || body.slugs.length < 2) {
    return NextResponse.json(
      { error: "title and at least two colleges are required" },
      { status: 400 }
    );
  }

  const item = await saveComparison({
    ownerKey,
    title: body.title,
    slugs: body.slugs
  });

  return NextResponse.json({ item });
}
