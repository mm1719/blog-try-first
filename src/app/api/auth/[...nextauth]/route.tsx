import NextAuth from "next-auth"
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            authorization: {
                params: {
                  scope: 'read:user user:email', // Example scopes
                },
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isWriter = (profile as any).login === 'mm1719'
            if (isWriter) {
                user.isWriter = true;
            }
            if (profile && account?.provider === 'github') {
                // Assuming 'login' is the GitHub username
                account.username = profile?.login;
                user.avatarUrl = profile.image;
            }
            return true
        },
        async jwt({ token, user, account }) {
            if (user?.isWriter) {
                token.isWriter = true;
            }
            if (account?.username) {
                token.username = account.username;
            }
            if (user?.avatarUrl) {
                token.avatarUrl = user.avatarUrl;
            }
            return token;
        },
        async session({ session, token }) {
            // Include the isWriter claim in the session for client-side use
            if (token.isWriter && session.user) {
                session.user.isWriter = true;
            }
            if (token.username && session.user) {
                session.user.username = token.username as string;
            }
            if (token.avatarUrl && session.user) {
                session.user.avatarUrl = token.avatarUrl as string;
            }
            return session;
        },
    }
})

export { handler as GET, handler as POST }