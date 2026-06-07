import { NextRequest, NextResponse } from "next/server";
import { createDiscussion, readDiscussions } from "@/lib/discussion-store";
import { getUserFromSession } from "@/lib/auth-store";
import { readAuthCookie } from "@/lib/session";

export async function GET() {
  const items = await readDiscussions();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    title?: string;
    body?: string;
    collegeSlug?: string;
  };

  if (!body.title || !body.body) {
    return NextResponse.json({ error: "title and body are required" }, { status: 400 });
  }

  const author = await getUserFromSession(await readAuthCookie());

  const item = await createDiscussion({
    title: body.title,
    body: body.body,
    collegeSlug: body.collegeSlug,
    authorName: author?.name ?? "Guest"
  });

  return NextResponse.json({ item });
}
