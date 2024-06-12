import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import { db } from "./prisma/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [github, google],
});

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            isAdmin: boolean;
        } & DefaultSession["user"];
    }
}
