import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userId: string;
      role: string;
      roleid: string;
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    userId: string;
    role: string;
    roleid: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userId: string;
    role: string;
    roleid: string;
    accessToken: string;
  }
}
