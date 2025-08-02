import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_ROUTES = ["/tasks"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const requiresAuth = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  if (!requiresAuth) return NextResponse.next();

  const cookieHeader = req.headers.get("cookie");
  const token = cookieHeader
    ?.split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next|.*\\.(?:ico|png|jpg|jpeg|svg|css|js|json|txt|xml)).*)"],
};
