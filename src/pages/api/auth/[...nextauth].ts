import { options } from "../../../lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(options);

export default handler;

// export {handler as GET, handler as POST}