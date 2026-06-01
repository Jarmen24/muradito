import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/db";

// Fix AuthUser to match what authorize() actually returns (camelCase)
type AuthUser = {
  id: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profilePicture?: string | null;
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
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("Invalid Credentials");

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
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture,
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
        token.firstName = authUser.firstName; // fixed: was authUser.first_name
        token.lastName = authUser.lastName; // fixed: was authUser.last_name
        token.profilePicture = authUser.profilePicture; // fixed: was authUser.profile_picture
      }
      return token;
    },
    async session({ session, token }) {
      // Fix: actually assign token values TO the session object
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.firstName = token.firstName as string | null;
      session.user.lastName = token.lastName as string | null;
      session.user.profilePicture = token.profilePicture as string | null;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
};

export default options;
