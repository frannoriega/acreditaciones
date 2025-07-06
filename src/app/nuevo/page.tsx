import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { getUserApplicationStatus } from "@/services/users/application-status"
import Container from "@/components/atoms/container"
import Logo from "@/components/atoms/logo"
import SignUpForm from "@/components/templates/sign-up-form"

export default async function NewUserPage() {
  // Get session on server side
  const session = await auth()
  
  if (!session?.user?.email) {
    // If not authenticated, redirect to sign in
    redirect('/api/auth/signin')
  }

  // Check if user has already applied
  const applicationStatus = await getUserApplicationStatus(session.user.email)
  
  if (applicationStatus.hasApplied) {
    // User has already applied, redirect to /u
    redirect('/u')
  }

  return (
    <Container className="w-full flex flex-col items-center py-4">
      <Logo className="p-8 fill-slate-50 w-fit"/>
      <SignUpForm />
    </Container>
  )
}
