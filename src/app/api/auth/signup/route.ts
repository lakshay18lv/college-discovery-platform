import { NextRequest, NextResponse } from "next/server";
import { createSession, createUser } from "@/lib/auth-store";
import { AUTH_COOKIE } from "@/lib/session";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json({ error: "name, email, and password are required" }, { status: 400 });
  }

  try {
    const user = await createUser({
      name: body.name,
      email: body.email,
      password: body.password
    });
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
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create user" },
      { status: 400 }
    );
  }
}
