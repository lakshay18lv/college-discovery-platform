import { NextRequest, NextResponse } from "next/server";
import { addAnswer } from "@/lib/discussion-store";
import { getUserFromSession } from "@/lib/auth-store";
import { readAuthCookie } from "@/lib/session";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as { body?: string };

  if (!body.body) {
    return NextResponse.json({ error: "body is required" }, { status: 400 });
  }

  try {
    const author = await getUserFromSession(await readAuthCookie());
    const item = await addAnswer({
      postId: id,
      body: body.body,
      authorName: author?.name ?? "Guest"
    });
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to add answer" },
      { status: 404 }
    );
  }
}
