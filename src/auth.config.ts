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
    signIn: async ({ user }) => {
      // After successful sign in, redirect based on application status
      // The middleware will handle the actual redirect logic
      return true
    },
    redirect: async ({ url, baseUrl }) => {
      // Let the middleware handle redirects based on application status
      return url.startsWith(baseUrl) ? url : baseUrl + "/u"
    },
  }
} satisfies Partial<NextAuthConfig>

export const authConfig = {
  providers: [
    Resend,
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true
    })
  ],
  ...baseConfig
}

export const middlewareConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true
    })
  ],
  ...baseConfig
} satisfies NextAuthConfig
