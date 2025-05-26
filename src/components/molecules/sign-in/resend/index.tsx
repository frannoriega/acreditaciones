'use client'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/atoms/ui/form"
import { Button } from "@/components/atoms/ui/button"
import { Input } from "@/components/atoms/ui/input"
import { signInWithEmail } from "@/services/auth"

const formSchema = z.object({
  email: z.string().email()
})

export function ResendSignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  })

  const submit = (formData: FormData) => {
    signInWithEmail(formData)
  }

  return (
    <Form {...form}>
      <form
        action={submit}
        className="w-full flex flex-col gap-2 items-center dark"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input type="email" placeholder="Email" {...field} className="w-full bg-slate-200 dark:bg-slate-200"/>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full dark:bg-slate-900 text-slate-100" disabled>Iniciar sesión con email</Button>
      </form>
    </Form>
  )
}
