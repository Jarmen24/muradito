import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import LogoutButton from "./LogoutButton";
import { DropdownMenuAvatar } from "./DropdownMenuAvatar";

const Header = async () => {
  const navItem =
    "text-md px-4 py-3 rounded-xl transition duration-300 ease-in-out";

  const session = await getServerSession(options);
  console.log(session);
  return (
    <header className="flex items-center w-full px-6 py-2 absolute z-30">
      {/* 1. Logo stays on the left */}
      <Link href="/" className="shrink-0">
        <Image src="/bookit-white.png" width={90} height={40} alt="logo" />
      </Link>

      {/* 2. Links - "mx-auto" pushes everything else away to center these */}
      <nav className="flex items-center mx-auto  rounded-xl bg-white">
        <Link href="/" className={navItem}>
          Home
        </Link>
        <Link href="/" className={navItem}>
          Hotel & Homes
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
          <DropdownMenuAvatar avatarsize="lg" />
        ) : (
          <Button>Get Started</Button>
        )}
      </div>
    </header>
  );
};

export default Header;
