import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/lib/db";

import AccountProfileClient, {
  type AccountUserDTO,
} from "./account-profile-client";

type SessionUserWithId = {
  id: string;
  email?: string | null;
};

function getSessionUserId(session: Awaited<ReturnType<typeof getServerSession>>) {
  const u = session?.user as SessionUserWithId | undefined;
  return u?.id ?? null;
}

export async function updateAccount(formData: FormData) {
  "use server";

  const nextSession = await getServerSession(options);
  const nextUserId = getSessionUserId(nextSession);
  if (!nextUserId) {
    return { success: false as const, message: "You need to sign in again." };
  }

  const first_name = (formData.get("first_name") as string)?.trim() ?? "";
  const lastRaw = (formData.get("last_name") as string)?.trim();
  const last_name = lastRaw === "" ? null : lastRaw;

  if (!first_name) {
    return { success: false as const, message: "First name is required." };
  }

  try {
    await prisma.user.update({
      where: { id: nextUserId },
      data: { first_name, last_name },
    });
  } catch {
    return {
      success: false as const,
      message: "We could not save your profile. Please try again.",
    };
  }

  revalidatePath("/account");
  return { success: true as const };
}

export default async function AccountPage() {
  const session = await getServerSession(options);
  const userId = getSessionUserId(session);
  if (!userId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      first_name: true,
      last_name: true,
      createdAt: true,
      password: true,
      _count: {
        select: {
          listings: true,
          bookings: true,
          ratings: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const dto: AccountUserDTO = {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    createdAtISO: user.createdAt.toISOString(),
    hasPassword: user.password != null && user.password.length > 0,
    counts: {
      listings: user._count.listings,
      bookings: user._count.bookings,
      ratings: user._count.ratings,
    },
  };

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
            Your details and a snapshot of your activity—update your name anytime.
          </p>
        </div>
      </div>

      <div className="w-full px-4 md:px-10 lg:px-15">
        <AccountProfileClient user={dto} updateAccount={updateAccount} />
      </div>
    </div>
  );
}
