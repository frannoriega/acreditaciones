'use client'
import { Button } from "@/components/atoms/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form";
import { Separator } from "@/components/atoms/ui/separator";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod/v4";
import { newBandFormSchema } from "./schemas";
import NameField from "./fields/about/name";
import GenderField from "./fields/about/gender";
import BioField from "./fields/about/bio";
import DiscographyField from "./fields/about/discography";
import SupportField from "./fields/members/support";
import FeeField from "./fields/stage/fee";
import StageField from "./fields/stage/stage";
import { useRouter } from "next/navigation";



type BandSignUpFormProps = {
  onProgress?: (progress: number) => void
}

export default function BandSignUpForm({ }: BandSignUpFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const defaultValues = {
    name: "",
    bio: "",
    gender: undefined,
    support: 0,
    fee: 0,
    stage: undefined,
  }

  const form = useForm<z.infer<typeof newBandFormSchema>>({
    resolver: standardSchemaResolver(newBandFormSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })


  async function onSubmit(values: z.infer<typeof newBandFormSchema>) {
    setIsSubmitting(true);
    try {
      // Create FormData for file uploads
      const formData = new FormData();
      
      // Add basic fields
      formData.append("name", values.name);
      formData.append("bio", values.bio);
      formData.append("gender", values.gender);
      formData.append("support", values.support.toString());
      formData.append("fee", values.fee.toString());
      
      // Add arrays as JSON strings
      formData.append("discography", JSON.stringify(values.discography));
      formData.append("stage", JSON.stringify(values.stage || []));

      // Submit to API
      const response = await fetch("/api/bands", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit application");
      }

      await response.json();
      
      // Redirect to user dashboard
      router.push('/u');
      
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold w-full">Acerca de la banda</h1>
          <div className="flex flex-row gap-4">
            <NameField className="w-full flex flex-col gap-2" />
            <GenderField className="w-1/4 flex flex-col gap-2" />
          </div>
          <BioField className="w-full flex flex-col gap-2" />
          <DiscographyField className="flex flex-row items-start w-full gap-4" />
        </section>
        {
          // <Separator orientation="horizontal" />
          // <section className="flex flex-col items-start w-full gap-4">
          //   <h1 className="text-lg font-semibold w-full">Integrantes</h1>
          //   <InstrumentsField className="w-full flex flex-col gap-2" />
          // </section>
        }
        <Separator orientation="horizontal" />
        <section className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold w-full">Técnica</h1>
          <SupportField className="w-full"/>
          <FeeField className="w-full"/>
          <StageField />
        </section>
        <div className="flex flex-col w-full gap-4 items-center">
          <Separator orientation="horizontal" />
          <div className="flex flex-row w-full gap-4 items-center">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
