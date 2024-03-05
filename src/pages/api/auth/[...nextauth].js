import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";



export const authOptions = {
  providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID ,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
      }),
  
  ],
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXT_AUTH_SECRET ,
  cookies: {
      callbackUrl: {
          name: `__Secure-next-auth.callback-url`,
          options: {
              sameSite: "lax",
              path: "/",
              httpOnly: true,
              encode: () => nextAuthUrl,
              secure: true,
          },
      },
  },
};
export default NextAuth(authOptions);