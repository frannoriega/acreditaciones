'use client'
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNewUserFormContext } from "@/hooks/use-new-user-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newArtisanFormSchema = z.object({
  name: z.string().min(3, "Lala"),
  lastname: z.string().min(3, "Lele"),
  type: z.enum(['artesane', 'manualista'])
})

export default function ArtisanSignUpPage() {
  const router = useRouter()
  const formContext = useNewUserFormContext()

  if (!formContext.user) {
    redirect('/nuevo')
  }

  const form = useForm<z.infer<typeof newArtisanFormSchema>>({
    resolver: zodResolver(newArtisanFormSchema),
    mode: 'onChange'
  })

  function onSubmit(values: z.infer<typeof newArtisanFormSchema>) {
    const val = {
      data: values
    }
    formContext.updateUserData(val)

    console.log("submit form", formContext.user)

    router.push('/u/')
  }


  return (
    <Container className="w-full flex flex-col items-center pt-16">
      <Card className="min-w-2/3 flex flex-col">
        <CardHeader className="w-full">
          <CardTitle className="w-full">
            <h1 className="w-full text-center">
              Inscripción como artesane
            </h1>
          </CardTitle>
          <CardDescription className="sr-only">Formulario de inscripción como artesane</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h1 className="font-semibold">Requisitos</h1>
            <p></p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-2 items-start gap-4">
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input onChange={field.onChange}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastname'
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input onChange={field.onChange}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className="w-full self-start">
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full mr-4">
                          <SelectValue placeholder="Trabajo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="artesane">Artesane</SelectItem>
                        <SelectItem value="manualista">Manualista</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4 col-start-1">Enviar</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Container>
  )
}
