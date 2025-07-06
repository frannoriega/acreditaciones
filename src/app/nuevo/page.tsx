'use client'

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import Container from "@/components/atoms/container"
import Logo from "@/components/atoms/logo"
import SignUpForm from "@/components/templates/sign-up-form"

export default function NewUserPage() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "loading") return

    if (session?.user?.email) {
      // Check if user has already applied
      checkUserApplicationStatus(session.user.email)
    }
  }, [session, status])

  const checkUserApplicationStatus = async (email: string) => {
    try {
      const response = await fetch(`/api/user/application-status?email=${encodeURIComponent(email)}`)
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.hasApplied) {
          // User has already applied, redirect to /u
          window.location.href = "/u"
        }
      }
    } catch (error) {
      console.error("Error checking application status:", error)
    }
  }

  return (
    <Container className="w-full flex flex-col items-center py-4">
      <Logo className="p-8 fill-slate-50 w-fit"/>
      <SignUpForm />
    </Container>
  )
}
