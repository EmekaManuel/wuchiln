import { NextApiHandler } from "next";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import type { Adapter } from "next-auth/adapters";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
};

const handler: NextApiHandler = async (req, res) => {
  await NextAuth(req, res, authOptions);
};

export default handler;
