'use client'

import Container from "@/components/atoms/container"
import Logo from "@/components/atoms/logo"
import SignUpForm from "@/components/templates/sign-up-form"

export default function NewUserPage() {

  return (
    <Container className="w-full flex flex-col items-center py-4">
      <Logo className="p-8 fill-slate-50 w-fit"/>
      <SignUpForm />
    </Container>
  )
}
