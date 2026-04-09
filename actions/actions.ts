"use server";

import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) return;

  await prisma.users.create({
    data: {
      name,
      email,
    },
  });
  revalidatePath("/"); // Revalidate the current page to show the new user
}
export default createUser;
