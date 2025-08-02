"use server";

// lib/getCurrentUser.js
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { db } from "@/lib/prisma";

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (!payload?.id) return null;

    // Fetch full user from DB
    const user = await db.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return user || null;
  } catch (err) {
    console.error("Invalid JWT:", err.message);
    return null;
  }
}
