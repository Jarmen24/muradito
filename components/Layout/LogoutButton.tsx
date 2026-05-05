"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <div>
      <Button onClick={() => signOut({ callbackUrl: "/login" })}>
        Signout
      </Button>
    </div>
  );
};

export default LogoutButton;
