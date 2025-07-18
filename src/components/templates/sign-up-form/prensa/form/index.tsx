'use client'

import HTMLComment from "react-html-comment"
import FileInput from "@/components/atoms/file-input";
import { Button } from "@/components/atoms/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form";
import { Input } from "@/components/atoms/ui/input";
import { Label } from "@/components/atoms/ui/label";
import { Separator } from "@/components/atoms/ui/separator";
import { Textarea } from "@/components/atoms/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/ui/tooltip";
import { MultiSelect, MultiSelectValues, MultiSelectMenu, MultiSelectTrigger, MultiSelectContent, MultiSelectInput, MultiSelectList, MultiSelectGroup, MultiSelectItem } from "@/components/molecules/multi-select";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Info, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod/v4";

const newPressFormSchema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9]*$/, "Sólo se permite caracteres alfanuméricos").min(3, "Ingrese al menos 3 caracteres"),
  bio: z.string().nonempty("Ingrese una biografía").max(500),
  gender: z.enum(["cumbia", "rock"], "Seleccione un género"),
  discography: z.array(
    z.object({
      name: z.string().nonempty("Ingrese un nombre para el disco"),
      release_date: z.coerce.number("Ingrese un número").min(1930, "Ingrese un año mayor a 1930").max(new Date().getFullYear(), "Ingrese un año actual o pasado")
    })
  ),
  support: z.coerce.number({
    error: "Ingrese un número"
  }).nonnegative("Ingrese un número positivo"),
  instruments: z.map(
    z.enum(["guitar", "keyboard"]),
    z.number()
  ).refine(m => m.size == 0 || m.values().some(v => v > 0), { error: "Seleccione al menos un músico" }),
  fee: z.coerce.number({
    error: "Ingrese un número"
  }).nonnegative("Ingrese un número positivo"),
  rider: z.file({
    error: "Ingrese un archivo"
  }),
  backline: z.file("Ingrese un archivo en formato PDF o imagen"),
  stage: z.file("Ingrese un archivo en formato PDF o imagen"),
})

type PressSignUpFormProps = {
  onProgress?: (progress: number) => void
}

export default function PressSignUpForm({ }: PressSignUpFormProps) {
  const [bioLength, setBioLength] = useState(0)
  const defaultValues = {
    name: "",
    bio: "",
    gender: undefined,
    support: 0,
    fee: 0,
    instruments: new Map(),
    discography: [],
    rider: undefined,
    backline: undefined,
    stage: undefined,
  }
  const form = useForm<z.infer<typeof newPressFormSchema>>({
    resolver: standardSchemaResolver(newPressFormSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const { fields, append, remove } = useFieldArray({
    name: "discography",
    control: form.control,
  })

  // Efficient bio length tracking
  useEffect(() => {
    const subscription = form.watch((value) => {
      setBioLength(value.bio?.length || 0);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: z.infer<typeof newPressFormSchema>) {
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <HTMLComment text="Formulario de foodtruck"/>
        <section className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold w-full">Acerca del emprendimiento</h1>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-2">
                <FormLabel>Nombre del emprendimiento</FormLabel>
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
                  <Textarea {...field} maxLength={500} className="flex-wrap w-full break-after-all" />
                </FormControl>
                <div className="flex flex-row">
                  <FormMessage className="w-full" />
                  <span className="w-full text-right text-sm text-muted-foreground">Caracteres {bioLength}/500</span>
                </div>
              </FormItem>

            )}
          />
          <Label>Discografía</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-row items-start w-full gap-4">
              <FormField
                name={`discography.${index}.name`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col justify-end gap-2">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl >
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="w-full" />
                  </FormItem>

                )}
              />
              <FormField
                name={`discography.${index}.release_date`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col gap-2">
                    <FormLabel>Año de lanzamiento</FormLabel>
                    <FormControl >
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="w-full" />
                  </FormItem>

                )}
              />
              <Button className="mt-[22px]" variant="destructive" onClick={() => remove(index)}><Trash2 className="w-6 h-6" /></Button>
            </div>
          ))
          }
          <Button type="button" onClick={() => append({ name: "", release_date: new Date().getFullYear() })}>Agregar disco</Button>
        </section>
        <Separator orientation="horizontal" />
        <section className="flex flex-col items-start w-full gap-4">
          <h1 className="text-lg font-semibold w-full">Integrantes</h1>
          <FormField
            name="instruments"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-2">
                <FormLabel>Seleccione los integrantes</FormLabel>
                <FormControl>
                  <MultiSelect onValueChange={field.onChange}>
                    <MultiSelectValues />
                    <MultiSelectMenu>
                      <MultiSelectTrigger>
                        <span>Seleccionar integrantes</span>
                      </MultiSelectTrigger>
                      <MultiSelectContent>
                        <MultiSelectInput placeholder="Buscar integrantes..." />
                        <MultiSelectList>
                          <MultiSelectGroup heading="Instrumentos">
                            <MultiSelectItem value="guitar">Guitarra</MultiSelectItem>
                            <MultiSelectItem value="keyboard">Teclado</MultiSelectItem>
                          </MultiSelectGroup>
                        </MultiSelectList>
                      </MultiSelectContent>
                    </MultiSelectMenu>
                  </MultiSelect>
                </FormControl>
                <FormMessage />
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
                  <div className="relative ">
                    <div className="absolute overflow-hidden left-0 bg-input rounded-l-md  h-full min-w-8 flex items-center justify-center">
                      <span className="hover:cursor-default">$</span>
                    </div>
                    <Input {...field} type="number" className="relative pl-10" />
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
                  <FileInput
                    className="min-h-20 text-current bg-input/30 rounded-lg flex flex-col items-center justify-center outline-dashed outline-input outline-2 -outline-offset-8 hover:bg-input"
                    onChange={(e) => field.onChange(e.target.files?.[0])} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="backline"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Backline</FormLabel>
                <FormControl>
                  <FileInput
                    className="min-h-20 text-current bg-input/30 rounded-lg flex flex-col items-center justify-center outline-dashed outline-input outline-2 -outline-offset-8 hover:bg-input"
                    onChange={(e) => field.onChange(e.target.files?.[0])} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="stage"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Plano de escenario</FormLabel>
                <FormControl>
                  <FileInput
                    className="min-h-20 text-current bg-input/30 rounded-lg flex flex-col items-center justify-center outline-dashed outline-input outline-2 -outline-offset-8 hover:bg-input"
                    onChange={(e) => field.onChange(e.target.files?.[0])} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <div className="flex flex-col w-full gap-4 items-center">
          <Separator orientation="horizontal" />
          <div className="flex flex-row w-full gap-4 items-center">
            <Button type="submit" className="w-full">Enviar</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
