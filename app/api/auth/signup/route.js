// // ✅ app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const data = await req.json();
    const { email, password, name } = data;

    const errors = {};

    if (!email || !email.includes("@")) errors.email = "Valid email is required";
    if (!password || password.length < 6) errors.password = "Password must be at least 6 characters";
    if (!name) errors.name = "Name is required";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors });
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ success: false, errors: { email: "User already exists" } });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: { email, password: hashedPassword, name },
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
