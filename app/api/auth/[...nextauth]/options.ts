import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/db";

type AuthUser = {
  id: string;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
};

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

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser;
        token.id = authUser.id;
        token.email = authUser.email;
        token.first_name = authUser.first_name;
        token.last_name = authUser.last_name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as AuthUser).id = token.id as string;
        (session.user as AuthUser).email = token.email as string | null;
        (session.user as AuthUser).first_name = token.first_name as string | null;
        (session.user as AuthUser).last_name = token.last_name as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
};

export default options;
