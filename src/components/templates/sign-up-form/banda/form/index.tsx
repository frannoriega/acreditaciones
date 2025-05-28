'use client'
import { Button } from "@/components/atoms/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form";
import { Input } from "@/components/atoms/ui/input";
import { Separator } from "@/components/atoms/ui/separator";
import { Textarea } from "@/components/atoms/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/ui/tooltip";
import { MultiSelect } from "@/components/molecules/multi-select";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

const newBandFormSchema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9]*$/, "Sólo se permite caracteres alfanuméricos").min(3, "Ingrese al menos 3 caracteres"),
  bio: z.string().nonempty("Ingrese una biografía").max(500),
  gender: z.enum(["cumbia", "rock"]),
  discography: z.array(
    z.object({
      name: z.string().nonempty(),
      release_date: z.date()
    })
  ),
  support: z.coerce.number({
    message: "Ingrese un número"
  }).nonnegative("Ingrese un número positivo"),
  instruments: z.array(
    z.enum(["guitar", "keyboard"])
  ),
  fee: z.coerce.number({
    message: "Ingrese un número"
  }).nonnegative("Ingrese un número positivo"),
  rider: z.file()
})

type BandSignUpFormProps = {
  onProgress?: ({ step, total }: { step: number, total: number }) => void
}

export default function BandSignUpForm({ onProgress }: BandSignUpFormProps) {
  const [valid, setValid] = useState(0)
  const [bioLength, setBioLength] = useState(0)
  const form = useForm<z.infer<typeof newBandFormSchema>>({
    resolver: standardSchemaResolver(newBandFormSchema),
    defaultValues: {
      name: "",
      support: 0,
      fee: 0
    },
    mode: 'onChange'
  })

  const totalSteps = Object.keys(form.getValues()).length

  useEffect(() => {
    const callback = form.subscribe({
      formState: {
        dirtyFields: true,
        errors: true
      },
      callback: ({ dirtyFields, errors }) => {
          setValid(Object.keys(dirtyFields ?? {}).length - Object.keys(errors ?? {}).length)
      }
    })
    return () => callback()
  }, [form])

  useEffect(() => {
    if (onProgress) {
      onProgress({ step: valid, total: totalSteps })
    }
  }, [valid, onProgress, totalSteps])

  useEffect(() => {
    const callback = form.subscribe({
      formState: {
        values: true
      },
      name: "bio",
      callback: ({ values }) => {
        setBioLength(values.bio.length)
      }
    })

    return () => callback()
  }, [form])


  function onSubmit(values: z.infer<typeof newBandFormSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold w-full">Acerca de la banda</h1>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-2">
                <FormLabel>Nombre de la agrupación</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />
          <FormField
            name="bio"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-2">
                <FormLabel>Biografía</FormLabel>
                <FormControl >
                  <Textarea {...field} maxLength={500} className="flex-wrap w-full break-after-all"/>
                </FormControl>
                <div className="flex flex-row">
                  <FormMessage className="w-full"/>
                  <span className="w-full text-right text-sm text-muted-foreground">Caracteres {bioLength}/500</span>
                </div>
              </FormItem>

            )}
          />
        </section>
        <Separator orientation="horizontal" />
        <section className="flex flex-col items-start w-full gap-4">
          <h1 className="text-lg font-semibold w-full">Integrantes</h1>
          <FormField
            name="instruments"
            control={form.control}
            render={() => (
              <FormItem className="w-full flex flex-col gap-2">
                <FormLabel>Seleccione los integrantes</FormLabel>
                <FormControl>
                  <MultiSelect />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="support"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  <span>
                    Cantidad de empleados
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>
                        Fotógrafos, sonidistas, etc.
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />
        </section>
        <Separator orientation="horizontal" />
        <section className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold w-full">Técnica</h1>
          <FormField
            name="fee"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Costo del cachét</FormLabel>
                <FormControl>
                  <div className="rounded-md overflow-hidden flex flex-row items-center">
                    <div className="rounded-l-md bg-input h-full min-w-8 flex items-center justify-center boder-input border-t border-l border-b">
                      <span>$</span>
                    </div>
                    <Input {...field} onInput={field.onChange} type="number" className="rounded-l-none rounded-r0md" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />
          <FormField
            name="rider"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Rider técnico</FormLabel>
                <FormControl>
                  <Input type="file" onInput={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
