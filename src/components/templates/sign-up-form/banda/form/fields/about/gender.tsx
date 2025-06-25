'use client'

import { useFormContext } from "react-hook-form"
import { z } from "zod/v4"
import { newBandFormSchema } from "@/components/templates/sign-up-form/banda/form/schemas";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form"
import { SearchableSelect, SearchableSelectContent, SearchableSelectEmpty, SearchableSelectInput, SearchableSelectItem, SearchableSelectList, SearchableSelectTrigger, SearchableSelectValue } from "@/components/atoms/searchable-select"

export default function GenderField(props: React.ComponentProps<typeof FormItem>) {
  const form = useFormContext<z.infer<typeof newBandFormSchema>>()

  return (
    <FormField
      name="gender"
      control={form.control}
      render={({ field }) => (
        <FormItem {...props} >
          <FormLabel>Género</FormLabel>
          <FormControl >
            <SearchableSelect onValueChange={field.onChange} defaultValue={field.value}>
              <SearchableSelectTrigger>
                <SearchableSelectValue placeholder="Seleccione el género" />
              </SearchableSelectTrigger>
              <SearchableSelectContent>
                <SearchableSelectInput placeholder="Buscar..." />
                <SearchableSelectList>
                  <SearchableSelectEmpty >
                    No se encontraron resultados.
                  </ SearchableSelectEmpty>
                  <SearchableSelectItem value="rock">Rock</SearchableSelectItem>
                  <SearchableSelectItem value="cumbia">Cumbia</SearchableSelectItem>
                </SearchableSelectList>
              </SearchableSelectContent>
            </SearchableSelect>
          </FormControl>
          <FormMessage />
        </FormItem>

      )}
    />
  )
}
