import { NextRequest } from "next/server";

const COOKIE = "admin_session";

export function verifyAdminCookie(request: NextRequest): boolean {
  const cookie = request.cookies.get(COOKIE)?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!cookie || !adminPassword) return false;
  try {
    const decoded = Buffer.from(cookie, "base64").toString("utf-8");
    return decoded.endsWith(`:${adminPassword}`);
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE;
