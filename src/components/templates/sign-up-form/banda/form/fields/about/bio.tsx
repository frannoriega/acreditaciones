'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form";
import { useFormContext } from "react-hook-form";
import { z } from "zod/v4";
import { newBandFormSchema } from "@/components/templates/sign-up-form/banda/form/schemas";
import { Textarea } from "@/components/atoms/ui/textarea";
import { useEffect, useState } from "react";

type BioFieldProps = {
  maxLength?: number
} & React.ComponentProps<typeof FormItem>

export default function BioField({ maxLength = 500, ...props }: BioFieldProps) {
  const [bioLength, setBioLength] = useState(0)

  const form = useFormContext<z.infer<typeof newBandFormSchema>>()

  useEffect(() => {
    const subscription = form.watch((value) => {
      setBioLength(value.bio?.length || 0);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <FormField
      name="bio"
      control={form.control}
      render={({ field }) => (
        <FormItem {...props} >
          <FormLabel>Biografía</FormLabel>
          <FormControl >
            <Textarea {...field} maxLength={maxLength} className="flex-wrap w-full break-after-all" />
          </FormControl>
          <div className="flex flex-row">
            <FormMessage className="w-full" />
            <span className="w-full text-right text-sm text-muted-foreground">Caracteres {bioLength}/{maxLength}</span>
          </div>
        </FormItem>

      )}
    />
  )
}
