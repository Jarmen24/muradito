import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/lib/db";
import AccountProfileClient from "./account-profile-client";
import { User } from "@prisma/client";

export async function updateAccount(formData: FormData) {}

export default async function AccountPage() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/login");
  }
  const user = await session?.user;

  return (
    <div className="flex min-h-screen flex-col gap-6">
      <div className="relative h-48 w-full overflow-hidden rounded-xl sm:h-56 md:h-64">
        <Image
          src="/bg-listing.jpg"
          alt=""
          fill
          className="object-cover object-[center_35%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-8 pt-24 md:px-10">
          <p className="text-xs font-medium tracking-widest text-white/80 uppercase">
            Account
          </p>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            My account
          </h1>
          <p className="mt-2 max-w-lg text-base text-gray-200">
            Your details and a snapshot of your activity—update your name
            anytime.
          </p>
        </div>
      </div>

      <div className="w-full px-4 md:px-10 lg:px-15">
        {/* <AccountProfileClient user={user} updateAccount={updateAccount} /> */}
        <AccountProfileClient user={user as User} />
      </div>
    </div>
  );
}
