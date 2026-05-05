import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import LogoutButton from "./LogoutButton";

const Header = async () => {
  const session = await getServerSession(options);
  console.log(session);
  return (
    <header className="flex items-center w-full px-6 py-2 absolute z-10">
      {/* 1. Logo stays on the left */}
      <div className="shrink-0">
        <Image src="/bookit.png" width={80} height={20} alt="logo" />
      </div>

      {/* 2. Links - "mx-auto" pushes everything else away to center these */}
      <nav className="flex items-center gap-7 mx-auto">
        <Link href="/" className="text-lg text-cyan-50">
          Home
        </Link>
        <Link href="/" className="text-xl font-bold">
          Hotel & Homes
        </Link>
        <Link href="/" className="text-xl font-bold">
          Real Estate
        </Link>
        <Link href="/" className="text-xl font-bold">
          Articles
        </Link>
      </nav>

      {/* 3. Button - stays on the right */}
      <div className="shrink-0">
        {session?.user ? <LogoutButton /> : <Button>Get Started</Button>}
      </div>
    </header>
  );
};

export default Header;
