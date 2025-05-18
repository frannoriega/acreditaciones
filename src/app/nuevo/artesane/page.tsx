'use client'
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNewUserFormContext } from "@/hooks/use-new-user-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newArtisanFormSchema = z.object({
  name: z.string(),
  cathegory: z.string()
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
      <Card className="md:min-w-96 flex flex-col">
        <CardHeader className="w-full">
          <CardTitle className="w-full">
            <h1 className="w-full text-center">
              Inscripción como artesane
            </h1>
          </CardTitle>
          <CardDescription className="sr-only">Formulario de inscripción como artesane</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-4">
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nombre</FormLabel>
                    <Input onChange={field.onChange}></Input>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='cathegory'
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo</FormLabel>
                    <Input onChange={field.onChange}></Input>
                  </FormItem>
                )}
              />
              <Button type="submit">Enviar</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Container>
  )
}
