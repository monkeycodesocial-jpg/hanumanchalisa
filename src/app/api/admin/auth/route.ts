import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/adminAuth";

const COOKIE = ADMIN_COOKIE_NAME;
const MAX_AGE = 60 * 60 * 8; // 8 hours

export async function POST(request: NextRequest) {
  const { password } = (await request.json()) as { password?: string };
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { success: false, error: "Admin password not configured on server." },
      { status: 500 }
    );
  }

  if (password !== adminPassword) {
    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
  }

  const token = Buffer.from(`${Date.now()}:${adminPassword}`).toString("base64");
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(COOKIE);
  return res;
}
