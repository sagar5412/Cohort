"use server";

import { redirect } from "next/navigation";
import prisma from "../db/index";
export async function signup(email: string, password: string) {
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });
  } catch (error: any) {
    throw new Error(error.message || "Signup failed");
  }
  redirect("/");
}
