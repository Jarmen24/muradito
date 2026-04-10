"use server";

import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const email = formData.get("email") as string;

  if (!first_name || !last_name || !email) return;

  await prisma.user.create({
    data: {
      first_name,
      last_name,
      email,
    },
  });
  revalidatePath("/"); // Revalidate the current page to show the new user
}
export default createUser;
