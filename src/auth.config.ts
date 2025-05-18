import { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"

const baseConfig = {
  pages: {
    signIn: "/",
    newUser: "/nuevo",
    verifyRequest: "/auth/verify-request", // Custom magic link page
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    // signIn: async ({ user }) => {
    //   if (user.email === 'frannoriega.92@gmail.com') {
    //     return '/nuevo'
    //   }
    //   return true
    // },
  }
} satisfies Partial<NextAuthConfig>

export const authConfig = {
  providers: [
    Resend,
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  ...baseConfig
}

export const middlewareConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  ...baseConfig
} satisfies NextAuthConfig
