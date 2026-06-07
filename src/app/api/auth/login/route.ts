import { NextRequest, NextResponse } from "next/server";
import { createSession, verifyUser } from "@/lib/auth-store";
import { AUTH_COOKIE } from "@/lib/session";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (!body.email || !body.password) {
    return NextResponse.json({ error: "email and password are required" }, { status: 400 });
  }

  const user = await verifyUser(body.email, body.password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const sessionToken = await createSession(user.id);
  const response = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email }
  });
  response.cookies.set(AUTH_COOKIE, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
  return response;
}
