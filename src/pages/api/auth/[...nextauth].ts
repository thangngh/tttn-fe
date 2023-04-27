import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FaceBookProvider from "next-auth/providers/facebook";

export interface ISession {
	email: string;
	accessToken: string;
}

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		// FaceBookProvider({
		// 	clientId: process.env.FACEBOOK_CLIENT_ID as string,
		// 	clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
		// })
	],
	secret: process.env.NEXTAUTH_SECRET as string,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, account }) {
			if (account?.provider === "google") {
				token.accessToken = account.id_token;
				token.sub = account.provider; //provider account
			}
			// if (account?.provider === "facebook") {
			// 	token.accessToken = account.accessToken;
			// 	token.sub = account.provider; //provider account
			// }
			return token;
		},
		async session({ session, token, user }) {
			(session.user as ISession).accessToken = token.accessToken as string;
			(session.user as ISession).email = token.email as string;

			return session;
		},
		async signIn({ user, account }) {
			if (account?.provider === "google") {
				account.accessToken = account?.id_token;
			}

			return true;
		},
	}
})