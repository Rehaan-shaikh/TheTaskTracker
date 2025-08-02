// ✅ app/api/auth/logout/route.js
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  await cookieStore.set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 0,
    path: "/",
  });

  return Response.json({ success: true });
}