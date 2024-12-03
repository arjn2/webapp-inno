import NextAuth from "next-auth/next"; //TODO "next-auth" only
import bcrypt from "bcryptjs";
import { executeQuery } from "../../../../utils/db";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                const user = await executeQuery(
                    `SELECT * FROM users WHERE email = ?`,
                    [email]
                );

                if (
                    user.length > 0 &&
                    (await bcrypt.compare(password, user[0].password))
                ) {
                    await executeQuery(
                        `UPDATE users SET last_logged_in = NOW() WHERE id = ?`,
                        [user[0].id]
                    );
                    const { password, ...userDetails } = user[0];
                    return userDetails;
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.privilege = user.privilege; // Storing user id in token
                token.email = user.email; // Storing user id in token
                // Add or modify token contents here if needed
            }
            return token;
        },
        async session({ session, token }) {
            // Attach the user id to the session object
            session.user.privilege = token.privilege;
            session.user.email = token.email;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
