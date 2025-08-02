import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_ROUTES = ["/todos", "/tasks", "/account"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check if this is a protected route
  const requiresAuth = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!requiresAuth) return NextResponse.next();

  // Get token from cookies
  const token = req.cookies.get("token")?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verify token
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
  matcher: ["/((?!_next|.*\\.(?:ico|png|jpg|jpeg|svg|css|js|json)).*)"],
};
