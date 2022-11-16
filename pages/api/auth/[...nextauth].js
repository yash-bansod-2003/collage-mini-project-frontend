import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions = {
    secret: process.env.JWT_SECRET,
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            async authorize(credentials, req) {
                const response = await axios
                    .post('http://127.0.0.1:5000/api/login', {
                        email: credentials.email,
                        password: credentials.password,
                    })
                    .catch((err) => err.response);

                if (response.status === 200) {
                    return response.data;
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: 'signin',
    },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.id = user._id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, user, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.image = null;
            return session;
        },
    },
};

export default NextAuth(authOptions);
