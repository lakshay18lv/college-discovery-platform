import { cookies } from "next/headers";

export const AUTH_COOKIE = "cdp-auth";

export async function readAuthCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value;
}
