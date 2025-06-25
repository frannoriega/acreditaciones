'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form"
import { Input } from "@/components/atoms/ui/input"
import { useFormContext } from "react-hook-form"
import { newBandFormSchema } from "@/components/templates/sign-up-form/banda/form/schemas";
import z from "zod/v4"

export default function NameField(props: React.ComponentProps<typeof FormItem>) {
  const form = useFormContext<z.infer<typeof newBandFormSchema>>()

  return (
    <FormField
      name="name"
      control={form.control}
      render={({ field }) => (
        <FormItem {...props}>
          <FormLabel>Nombre de la agrupación</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
