"use server";

import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";
import { success } from "zod";

const JWT_SECRET = "your-super-secret-jwt-key";

export async function signin(email: string, password: string) {
  // Fake DB check
  if (email !== "harkirat@gmail.com" || password !== "123456") {
    return {
      status: 401,
      error: "Invalid email or password",
    };
  }

  // Generate JWT
  const token = sign({ id: 1, email }, JWT_SECRET, { expiresIn: "7d" });

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return {
    status: 200,
    success: true,
  };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  return {
    status: 200,
    success: true,
  };
}
