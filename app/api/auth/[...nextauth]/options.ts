import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/db";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Invalid Credentials");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) throw new Error("No user found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
};

export default options;
