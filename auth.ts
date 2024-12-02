import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { supabase } from "./supabase";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "custom-credentials",
      name: "Custom Credentials",
      credentials: {
        email: {},
        password: {},
        loginType: {},
      },
      authorize: async (credentials) => {
        const validateFields = await signInSchema.safeParse(credentials);

        if (!validateFields.success) return null;

        const { email, password, loginType } = validateFields.data;

        let rpcName;
        if (loginType === "users") {
          rpcName = "get_login_users";
        } else if (loginType === "admin") {
          rpcName = "get_login_admin";
        }

        const { data: userData, error } = await supabase.rpc(rpcName!, { p_email: email });

        if (error || !userData[0]) {
          console.log(error);
          throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compareSync(password, userData[0].password);
        if (!isValidPassword) return null;

        return {
          userId: userData[0].id,
          role: userData[0].role,
          roleid: userData[0].roleid,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    // maxAge: 5 * 60, // 5 minutes
  },
  jwt: {
    // 24 * 60 * 60
    // maxAge: 5 * 60, // 5 minutes
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/not-found",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          userId: user.id,
          role: user.role,
          roleid: user.roleid,
        };
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.userId = token.userId as string;
      session.user.role = token.role! as string;
      session.user.roleid = token.roleid! as string;
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
