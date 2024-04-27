import Axios from "@/lib/Axios";
import startDb from "@/startDb";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Providers
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  adapter: PrismaAdapter(startDb),
  providers: [
    CredentialsProvider({
      type: "credentials",
      // Login Input
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const res = await Axios.post("/api/auth/login", {
            email,
            password,
          });

          const user = res.data.user;

          console.log(user);

          return user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 1000 * 60 * 60 * 2, // 2h Cookie/JWT Tokens Expiration
  },

  callbacks: {
    // Setting the user id to session id from the token
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    // Setting the id to JWT from the user object
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
};

export default authOptions;
