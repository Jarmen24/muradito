"use server";

import bcrypt from "bcrypt";
import prisma from "../lib/db";
import signIn from "next-auth";

export async function register(formData: FormData) {
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !email || !password) {
    throw new Error("Missing Fields");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email is already taken");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPassword,
    },
  });

  if (!user) {
    throw new Error("Problem in database");
  }

  return { email, password };
}
