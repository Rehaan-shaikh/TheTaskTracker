// / ✅ app/api/auth/me/route.js
import { cookies } from "next/headers";
import { db } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = cookies();
  const token = await cookieStore.get("token")?.value;
  if (!token) return Response.json({ user: null }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded?.id) return Response.json({ user: null }, { status: 401 });

  const user = await db.user.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });

  return Response.json({ user });
}