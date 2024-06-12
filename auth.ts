import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import { prisma } from "./prisma/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [github, google],
});

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
        } & DefaultSession["user"];
    }
}

// ska denna vara med? den var på hemsidan!??
/* providers: [
    GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
    })
] */
