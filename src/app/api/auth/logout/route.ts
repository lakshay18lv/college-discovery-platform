import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth-store";
import { readAuthCookie, AUTH_COOKIE } from "@/lib/session";

export async function POST() {
  const token = await readAuthCookie();
  if (token) {
    await deleteSession(token);
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  return response;
}
