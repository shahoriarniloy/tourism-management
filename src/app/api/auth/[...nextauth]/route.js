import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
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
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
          }),
        //   FacebookProvider({
        //     clientId: process.env.FACEBOOK_CLIENT_ID,
        //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        //   })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if(account.provider === 'google') {
                console.log("Google user info:", user);
                const { email, name, image } = user;
    
                try {
                    const db = await connectDB(); // Ensure awaiting the connection
                    const userCollection = db.collection('users');
                    const userExist = await userCollection.findOne({ email });
    
                    if (!userExist) {
                        console.log("User not found, inserting...");
                        await userCollection.insertOne({ name, email, image });
                        return user;
                    } else {
                        console.log("User exists, signing in...");
                        return user;
                    }
                } catch (error) {
                    console.error("Error during Google sign-in:", error);
                    return null;
                }
            } else {
                return user;
            }
        }
    },
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };
