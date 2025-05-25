'use client'

import CircularProgress from "@/components/circular-progress"
import Lipsum from "@/components/lipsum"
import Container from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNewUserFormContext } from "@/hooks/use-new-user-form-context"
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

const newUserFormSchema = z.object({
  type: z.enum(['banda', 'gastronomico', 'artesane', 'prensa']),
})

export default function NewUserPage() {
  const [typeForm, setTypeForm] = useState<React.ReactNode | null>(null)
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

  form.watch(({type}) => {
    switch (type) {
      case "banda":
        setTypeForm(<Lipsum />)
        break
      case "gastronomico":
      case "artesane":
      case "prensa":
        setTypeForm(null)
        break
    }
  })

  return (
    <Container className="w-full flex flex-col items-center pt-2">
      <Card className="min-w-1/2 w-full">
        <CardHeader className="w-full">
          <CardTitle className="text-center">Inscripción</CardTitle>
          <CardDescription className="sr-only">Formulario de inscripción</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row">
          <div className="w-fit sticky top-0 h-fit">
            <CircularProgress
              value={20}
              showLabel
              renderLabel={(progress) => `${progress}%`}
              labelClassName="text-xl font-bold"
              className="stroke-[#F229D9]/25"
              progressClassName="stroke-[#F229D9]"
            />
          </div>
          <div className="flex flex-col w-full relative">
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
            {typeForm ?? null}
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
