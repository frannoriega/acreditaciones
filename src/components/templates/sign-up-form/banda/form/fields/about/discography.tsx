'use client'

import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod/v4";
import { newBandFormSchema } from "@/components/templates/sign-up-form/banda/form/schemas";
import { Label } from "@/components/atoms/ui/label";
import { Button } from "@/components/atoms/ui/button";
import FormInput from "@/components/molecules/form/input";
import { Trash2 } from "lucide-react";

export default function DiscographyField(props: React.ComponentProps<"div">) {
  const form = useFormContext<z.infer<typeof newBandFormSchema>>()

  const { fields, append, remove } = useFieldArray({
    name: "discography",
    control: form.control,
  })
  return (
    <>
      <Label>Discografía</Label>
      {
        fields.map((field, index) => (
          <div key={field.id} {...props}>
            <FormInput
              label="Nombre"
              name={`discography.${index}.name`}
              control={form.control}
              className="w-full flex flex-col justify-end gap-2"
            />
            <FormInput
              label="Año de lanzamiento"
              name={`discography.${index}.release_date`}
              control={form.control}
              className="w-1/2 flex flex-col gap-2"
            />
            <Button className="mt-[22px]" variant="destructive" onClick={() => remove(index)}><Trash2 className="w-6 h-6" /></Button>
          </div>
        ))
      }
      <Button type="button" onClick={() => append({ name: "", release_date: new Date().getFullYear() })}>Agregar disco</Button>
    </>
  )
}
