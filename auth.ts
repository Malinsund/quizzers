
/* export const { handlers, signIn, signOut, auth } = NextAuth({
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
 */