'use client'
import { Button } from "@/components/atoms/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form";
import { Input } from "@/components/atoms/ui/input";
import { Separator } from "@/components/atoms/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/ui/tooltip";
import { MultiSelect } from "@/components/molecules/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newBandFormSchema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9]*$/, "Sólo se permite caracteres alfanuméricos").min(3, "Ingrese al menos 3 caracteres"),
  musicians: z.number({ message: "Ingrese un número" }).gte(1, "Debe haber al menos un músico"),
  support: z.number({
    message: "Ingrese un número"
  }).gte(0),
  instruments: z.array(
    z.enum(["guitarra", "teclado"])
  ),
  fee: z.number({
    message: "Ingrese un número"
  }).gte(0, "Ingrese un número positivo"),
  rider: z.instanceof(File)
    .refine(files => !files || files.size > 0, "Cargue un archivo")
})

export default function BandSignUpForm() {
  const form = useForm<z.infer<typeof newBandFormSchema>>({
    resolver: zodResolver(newBandFormSchema),
    defaultValues: {
      name: "",
      musicians: 2,
      support: 0,
      fee: 0
    }
  })

  function onSubmit(values: z.infer<typeof newBandFormSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold w-full">Información</h1>
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
                  <Input {...field} onChange={val => field.onChange(val.currentTarget.valueAsNumber)} type="number" />
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
                    <Input {...field} onChange={val => field.onChange(val.currentTarget.valueAsNumber)} type="number" className="rounded-l-none rounded-r0md" />
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
                  <Input type="file" {...field}/>
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
