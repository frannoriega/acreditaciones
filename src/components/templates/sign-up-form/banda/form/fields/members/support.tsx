'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form"
import { useFormContext } from "react-hook-form"
import { newBandFormSchema } from "../../schemas"
import z from "zod/v4"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/ui/tooltip"
import { Info } from "lucide-react"
import { Input } from "@/components/atoms/ui/input"

export default function SupportField(props: React.ComponentProps<typeof FormItem>) {
  const form = useFormContext<z.infer<typeof newBandFormSchema>>()
  return (
    <FormField
      name="support"
      control={form.control}
      render={({ field }) => (
        <FormItem {...props}>
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
  )
}
