import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      first_name?: string | null;
      last_name?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    first_name?: string | null;
    last_name?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    first_name?: string | null;
    last_name?: string | null;
  }
}
