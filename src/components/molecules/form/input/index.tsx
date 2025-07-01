'use client'

import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form"
import { Input } from "@/components/atoms/ui/input"
import { cn } from "@/lib/utils"
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form"

type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  label: string,
  className?: string
} & Omit<ControllerProps<TFieldValues, TName>, "render">

export default function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, label, control, className }: FormInputProps<TFieldValues, TName>) {

  const cns = cn("w-full flex flex-col gap-2", className)
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cns}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
