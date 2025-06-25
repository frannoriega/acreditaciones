'use client'

import { useFormContext } from "react-hook-form"
import { newBandFormSchema } from "../schemas"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form"
import z from "zod/v4"
import { MultiSelect } from "@/components/molecules/multi-select"

export default function InstrumentsField(props: React.ComponentProps<typeof FormItem>) {
  const form = useFormContext<z.infer<typeof newBandFormSchema>>()
  return (
    <FormField
      name="instruments"
      control={form.control}
      render={({ field }) => (
        <FormItem {...props}>
          <FormLabel>Seleccione los integrantes</FormLabel>
          <FormControl>
            <MultiSelect
              onValueChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )
      }
    />
  )
}
