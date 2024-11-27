import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials) return null;

                    const { email, password } = credentials;
                    if (!email || !password) return null;

                    const db = await connectDB();
                    const currentUser = await db.collection("users").findOne({ email });

                    if (!currentUser) return null;

                    const passwordMatched = bcrypt.compareSync(password, currentUser.password);
                    if (!passwordMatched) return null;

                    return { id: currentUser._id, email: currentUser.email };
                } catch (error) {
                    // console.error("Authorization error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                };
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };
