import { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"

export default {
  providers: [
    Resend,
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  pages: {
    signIn: "/"
  },
  session: {
    strategy: "database"
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    }
  }
} satisfies NextAuthConfig
