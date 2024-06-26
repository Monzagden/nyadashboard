import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password){
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email }
        });

        if (!existingUser) {
          return null;
        }

        if (existingUser.password) {
          
          const passwordMatch = await compare(credentials.password, existingUser.password);
          if (!passwordMatch) {
            return null;
        }

        }

        return {
          id: existingUser.id,
          email: existingUser.email,
          firstName: existingUser.firstName, 
          lastName: existingUser.lastName, 
        }
      }
    }),
  
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        return {
          ...token,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName, 
        }
      }
      return token || {};
    },
    async session({session, token}) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            email: token.email,
            firstName: token.firstName,
            lastName: token.lastName, 
          }
        }
      }
      return session;
    }
  }
}