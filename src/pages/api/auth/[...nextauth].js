import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      redirectUri: "https://www.mosquematch.com/api/auth/callback/google",
    }),
  ],
  secret: process.env.JWT_SECRET,
});
