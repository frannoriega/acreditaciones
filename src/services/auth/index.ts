"use server"

import { signIn } from "@/auth";

async function signInWithGoogle() {
  await signIn("google")
}

async function signInWithEmail(formData: FormData) {
  await signIn("resend", formData)
}

export { signInWithGoogle, signInWithEmail }
