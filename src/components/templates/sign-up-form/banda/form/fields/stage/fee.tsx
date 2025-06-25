'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form";
import { useFormContext } from "react-hook-form";
import { z } from "zod/v4";
import { newBandFormSchema } from "../../schemas";
import { Input } from "@/components/atoms/ui/input";

export default function FeeField(props: React.ComponentProps<typeof FormItem>) {
  const form = useFormContext<z.infer<typeof newBandFormSchema>>()

  return (
    <FormField
      name="fee"
      control={form.control}
      render={({ field }) => (
        <FormItem {...props} >
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
  )
}
