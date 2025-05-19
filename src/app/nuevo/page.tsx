'use client'

import Container from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNewUserFormContext } from "@/hooks/use-new-user-form-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
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

const newUserFormSchema = z.object({
  type: z.enum(['banda', 'gastronomico', 'artesane', 'prensa']),
})

export default function NewUserPage() {
  const router = useRouter()
  const formContext = useNewUserFormContext()

  const form = useForm<z.infer<typeof newUserFormSchema>>({
    resolver: zodResolver(newUserFormSchema),
    mode: 'onChange',
  })

  // STEP 3: Defining the submit function
  function onSubmit(values: z.infer<typeof newUserFormSchema>) {
    formContext.updateUserData(values)

    router.push('/nuevo/' + values.type)
  }

  return (
    <Container className="w-full flex flex-col items-center pt-2">
      <div className="relative w-full">
        <Progress value={33}/>
        <div className="size-4 bg-red-500 absolute top-0 left-1/3" />
      </div>
      <Card className="min-w-1/2 w-full">
        <CardHeader className="w-full">
          <CardTitle className="text-center">Inscripción</CardTitle>
          <CardDescription className="sr-only">Formulario de inscripción</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full items-center gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full items-start gap-4">
                    <FormLabel>Seleccione el tipo de acreditación</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Tipo de acreditación" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="banda">Banda</SelectItem>
                        <SelectItem value="gastronomico">Gastronómico</SelectItem>
                        <SelectItem value="artesane">Artesane</SelectItem>
                        <SelectItem value="prensa">Prensa</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full cursor-pointer" disabled={!form.formState.isValid}>Siguiente</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Container>
  )
}
