import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth-store";
import { readAuthCookie } from "@/lib/session";

export async function GET() {
  const user = await getUserFromSession(await readAuthCookie());
  return NextResponse.json({
    user: user ? { id: user.id, name: user.name, email: user.email } : null
  });
}
