import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import { DropdownMenuAvatar } from "./DropdownMenuAvatar";
import HeaderWrapper from "./HeaderWrapper";
import ImageContainer from "./ImageContainer";

const Header = async () => {
  const navItem =
    "text-md px-4 py-3 rounded-xl transition duration-300 ease-in-out";

  const session = await getServerSession(options);
  console.log(session);
  return (
    <HeaderWrapper>
      {/* 1. Logo stays on the left */}
      <Link href="/" className="shrink-0">
        <ImageContainer />
      </Link>

      {/* 2. Links - "mx-auto" pushes everything else away to center these */}
      <nav className="flex items-center mx-auto  rounded-xl bg-white">
        <Link href="/listing" className={navItem}>
          Listings
        </Link>
        <Link href="/" className={navItem}>
          Real Estate
        </Link>
        <Link href="/" className={navItem}>
          Articles
        </Link>
      </nav>

      {/* 3. Button - stays on the right */}
      <div className="shrink-0 flex gap-2 pr-6">
        {session?.user ? (
          <DropdownMenuAvatar
            avatarsize="lg"
            avatarsrc={session.user.profilePicture!}
          />
        ) : (
          <Button asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        )}
      </div>
    </HeaderWrapper>
  );
};

export default Header;
