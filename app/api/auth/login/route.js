// ✅ app/api/auth/login/route.js
import { db } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  const data = await req.json();
  const { email, password } = data;

  const errors = {};

  if (!email || !email.includes("@")) errors.email = "Valid email is required";
  if (!password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    return Response.json({ success: false, errors });
  }

  const user = await db.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    return Response.json({
      success: false,
      errors: { email: "Invalid email or password", password: "Invalid email or password" },
    });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return Response.json({
      success: false,
      errors: { email: "Invalid email or password", password: "Invalid email or password" },
    });
  }

  const token = signToken({ id: user.id, email: user.email });

  const cookieStore = cookies();
  await cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    path: "/",
  });

  return Response.json({ success: true });
}