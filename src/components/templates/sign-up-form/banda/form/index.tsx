'use client'
import { Button } from "@/components/atoms/ui/button";
import { Form } from "@/components/atoms/ui/form";
import { Separator } from "@/components/atoms/ui/separator";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import NameField from "./fields/about/name";
import GenderField from "./fields/about/gender";
import BioField from "./fields/about/bio";
import DiscographyField from "./fields/about/discography";
import SupportField from "./fields/members/support";
import FeeField from "./fields/stage/fee";
import StageField from "./fields/stage/stage";

const stageSchema = z.object({
  coords: z.object({
    x: z.number().nonnegative(),
    y: z.number().nonnegative()
  }),
  data: z.object({
    rider: z.string(),
    backline: z.string(),
    io: z.string().optional(),
  })
})

const newBandFormSchema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9]*$/, "Sólo se permite caracteres alfanuméricos").min(3, "Ingrese al menos 3 caracteres"),
  bio: z.string().nonempty("Ingrese una biografía").max(500),
  gender: z.enum(["cumbia", "rock"], "Seleccione un género"),
  discography: z.array(
    z.object({
      name: z.string().nonempty("Ingrese un nombre para el disco"),
      release_date: z.coerce.number("Ingrese un número").min(1930, "Ingrese un año mayor a 1930").max(new Date().getFullYear(), "Ingrese un año actual o pasado")
    })
  ),
  support: z.coerce.number({
    error: "Ingrese un número"
  }).nonnegative("Ingrese un número positivo"),
  fee: z.coerce.number({
    error: "Ingrese un número"
  }).nonnegative("Ingrese un número positivo"),
  rider: z.file({
    error: "Ingrese un archivo"
  }),
  backline: z.file("Ingrese un archivo en formato PDF o imagen"),
  stage: z.array(
    stageSchema
  ),
})

type BandSignUpFormProps = {
  onProgress?: (progress: number) => void
}

export default function BandSignUpForm({ }: BandSignUpFormProps) {
  const defaultValues = {
    name: "",
    bio: "",
    gender: undefined,
    support: 0,
    fee: 0,
    rider: undefined,
    backline: undefined,
    stage: undefined,
  }

  const form = useForm<z.infer<typeof newBandFormSchema>>({
    resolver: standardSchemaResolver(newBandFormSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })


  function onSubmit(values: z.infer<typeof newBandFormSchema>) {
    console.log(values);
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
            <Button type="submit" className="w-full">Enviar</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
