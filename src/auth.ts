
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { compare } from "bcrypt";

// This is a mock user database for demo purposes
// In a real app, you would use a database
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    // This is "password" hashed with bcrypt
    password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO3ByxmV1I4UO.UR.aA.6B5XJeeEMylyO",
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find(user => user.email === credentials.email);
        
        if (!user) {
          return null;
        }

        // In a real app, you would compare the password hash
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const { auth, signIn, signOut } = NextAuth(authOptions);
