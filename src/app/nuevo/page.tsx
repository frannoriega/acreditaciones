'use client'

import Container from "@/components/atoms/container"
import Lipsum from "@/components/atoms/lipsum"
import Logo from "@/components/atoms/logo"
import { Button } from "@/components/atoms/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/atoms/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/ui/select"
import CircularProgress from "@/components/molecules/circular-progress"
import SignUpForm from "@/components/templates/sign-up-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

// const newBandFormSchema = z.object({
//   name: z.string(),
//   birthday: z.date(),
//   musicians: z.number(),
//   employees: z.object({
//     technicians: z.number().max(5),
//     photographers: z.number().max(2),
//     // TODO: Complete
//   }),
//   fee: z.number(),
//   demo_url: z.string(),
// })


export default function NewUserPage() {
  const router = useRouter()


  return (
    <Container className="w-full flex flex-col items-center pt-2">
      <Logo className="p-8 fill-slate-50 w-fit"/>
      <SignUpForm />
    </Container>
  )
}
