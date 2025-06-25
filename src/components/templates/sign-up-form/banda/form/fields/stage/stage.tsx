'use client'

import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod/v4";
import { newBandFormSchema, stageDataSchema } from "../../schemas";
import { Stage } from "@/components/molecules/stage";
import { Form } from "@/components/atoms/ui/form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import FormInput from "@/components/molecules/form/input";
import { Button } from "@/components/atoms/ui/button";

type StagePoint<T> = {
  coords: {
    x: number,
    y: number
  },
  data: T
}

export default function StageField() {
  const form = useFormContext<z.infer<typeof newBandFormSchema>>()

  return (
    <Stage<z.infer<typeof stageDataSchema>>
      width={1024}
      height={630}
      className="bg-input rounded-md overflow-hidden"
      onPointsChange={(points: StagePoint<z.infer<typeof stageDataSchema>>[]) => {
        form.setValue('stage', points);
      } }
      renderModal={({ point, onSave, onClose }) => (
        <PointForm data={point.data} onSave={onSave} onClose={onClose} />
      )}
      defaultValues={{
        rider: '',
        backline: '',
        io: ''
      }}    >
      <div className='border-t-8 bg-[#FFFA20]/60 border-gray-600 border-dashed w-full flex flex-col'>
        <h1 className='py-8 text-muted text-3xl font-bold w-full flex flex-col items-center'>Público</h1>

      </div>
    </Stage>
  )
}

type PointFormProps<T> = {
  data: T,
  onSave: (data: T) => void
  onClose: () => void
}

function PointForm({ data, onSave, onClose }: PointFormProps<z.infer<typeof stageDataSchema>>) {
  const stageForm = useForm<z.infer<typeof stageDataSchema>>({
    resolver: standardSchemaResolver(stageDataSchema),
    defaultValues: data,
    mode: 'onChange'
  })

  function onSubmit(data: z.infer<typeof stageDataSchema>) {
    onSave(data)
    onClose()
  }

  return (
    <Form {...stageForm}>
      <form onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        stageForm.handleSubmit(onSubmit)(e)
      }} className="flex flex-col gap-4">
        <FormInput
          label="Rider"
          name="rider"
          control={stageForm.control}
        />
        <FormInput
          label="Rider"
          name="backline"
          control={stageForm.control}
        />
        <FormInput
          label="Rider"
          name="io"
          control={stageForm.control}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  )
}
