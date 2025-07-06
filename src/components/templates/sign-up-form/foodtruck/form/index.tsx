'use client'

import HTMLComment from "react-html-comment"
import { Button } from "@/components/atoms/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form";
import { Input } from "@/components/atoms/ui/input";
import { Separator } from "@/components/atoms/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/ui/tooltip";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Info } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { newFoodtruckFormSchema } from "./schemas";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DynamicFieldList } from "@/components/molecules/form/dynamic-field-list";

type FoodtruckSignUpFormProps = {
  onProgress?: (progress: number) => void
}

export default function FoodtruckSignUpForm({ }: FoodtruckSignUpFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const defaultValues = {
    foodtruckName: "",
    employees: 0,
    cuisineType: "",
    menuItems: [],
    lot: "",
  }

  const form = useForm<z.infer<typeof newFoodtruckFormSchema>>({
    resolver: standardSchemaResolver(newFoodtruckFormSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  async function onSubmit(values: z.infer<typeof newFoodtruckFormSchema>) {
    if (!session?.user?.email) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/foodtrucks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          email: session.user.email
        }),
      });

      if (response.ok) {
        router.push('/u');
      }
    } catch (error) {
      console.error('Error submitting foodtruck application:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <HTMLComment text="Formulario de foodtruck"/>
        <section className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold w-full">Acerca del Foodtruck</h1>
          <FormField
            name="foodtruckName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-2">
                <FormLabel>Nombre del Foodtruck</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ej: Tacos El Güero" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="cuisineType"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-2">
                <FormLabel>Tipo de Cocina</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ej: Mexicana, Italiana, Asiática, etc." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="menuItems"
            control={form.control}
            render={() => (
              <FormItem className="w-full flex flex-col gap-2">
                <FormLabel>Elementos del Menú</FormLabel>
                <FormControl>
                  <DynamicFieldList
                    label="Platillos principales"
                    name="menuItems"
                    control={form.control}
                    placeholder="Ej: Tacos al pastor"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <Separator orientation="horizontal" />
        <section className="flex flex-col items-start w-full gap-4">
          <h1 className="text-lg font-semibold w-full">Personal</h1>
          <FormField
            name="employees"
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
                        Cocineros, ayudantes, cajeros, etc.
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" max="100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <Separator orientation="horizontal" />
        <section className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold w-full">Ubicación</h1>
          <FormField
            name="lot"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Lote preferido (opcional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ej: Lote A, Lote B, etc." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <div className="flex flex-col w-full gap-4 items-center">
          <Separator orientation="horizontal" />
          <div className="flex flex-row w-full gap-4 items-center">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
