import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("email error");
        }

        const user = await prima?.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("user  error");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("password error");
        }

        return user;
      },
    }),
  ],
  // debug: process.env.NODE_ENV === "development",
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: "secret",
  jwt: {
    secret: "jwt_secret",
  },
  
});
