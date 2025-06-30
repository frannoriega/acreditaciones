'use client'

import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod/v4";
import { newBandFormSchema, stageDataSchema } from "../../schemas";
import { Stage } from "@/components/molecules/stage";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Button } from "@/components/atoms/ui/button";
import { Label } from "@/components/atoms/ui/label";
import { MultiSelect, MultiSelectContent, MultiSelectEmpty, MultiSelectInput, MultiSelectItem, MultiSelectList, MultiSelectMenu, MultiSelectTrigger, MultiSelectValues, MultiSelectGroup } from "@/components/molecules/multi-select";
import { DynamicInputList } from "@/components/molecules/form/dynamic-input-list";

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
    <div className="w-full flex flex-col gap-2">
      <Label>Planta de escenario</Label>
      <Stage<z.infer<typeof stageDataSchema>>
        width={1024}
        height={630}
        className="bg-input rounded-md overflow-hidden self-center"
        onPointsChange={(points: StagePoint<z.infer<typeof stageDataSchema>>[]) => {
          form.setValue('stage', points);
        }}
        renderModal={({ point, onSave, onClose }) => (
          <PointForm data={point.data} onSave={onSave} onClose={onClose} />
        )}
        defaultValues={{
          instruments: new Set(),
          rider: [],
          backline: [],
          io: []
        }}    >
        <div className='border-t-8 bg-[#FFFA20]/60 border-gray-600 border-dashed w-full flex flex-col'>
          <h1 className='py-8 text-muted text-3xl font-bold w-full flex flex-col items-center'>Público</h1>

        </div>
      </Stage>
    </div>
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

  // Convertir Set a array para el MultiSelect
  const instrumentsValue = stageForm.watch('instruments');
  const instrumentsArray = Array.from(instrumentsValue).map(instrument => ({
    value: instrument,
    label: getInstrumentLabel(instrument)
  }));

  // Función para obtener la etiqueta del instrumento
  function getInstrumentLabel(instrument: string): string {
    const labels: Record<string, string> = {
      guitar: 'Guitarra',
      bass: 'Bajo',
      keyboard: 'Teclado',
      piano: 'Piano',
      drums: 'Batería',
      percussion: 'Percusión',
      violin: 'Violín',
      cello: 'Violonchelo',
      viola: 'Viola',
      trumpet: 'Trompeta',
      saxophone: 'Saxofón',
      flute: 'Flauta',
      clarinet: 'Clarinete',
      trombone: 'Trombón',
      voice: 'Voz Principal',
      backing_vocals: 'Coros'
    };
    return labels[instrument] || instrument;
  }

  function onSubmit(data: z.infer<typeof stageDataSchema>) {
    // Filtrar campos vacíos antes de guardar
    const cleanData = {
      ...data,
      rider: data.rider.filter(item => item.trim() !== ''),
      backline: data.backline.filter(item => item.trim() !== ''),
      io: data.io.filter(item => item.trim() !== '')
    };
    console.log('cleanData:', cleanData);
    onSave(cleanData);
    onClose();
  }

  return (
    <Form {...stageForm}>
      <form onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        stageForm.handleSubmit(onSubmit)(e)
      }} className="flex flex-col gap-4">
        <FormField
          name="instruments"
          control={stageForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instrumentos</FormLabel>
              <FormControl>
                <MultiSelect
                  className="w-full"
                  defaultValues={instrumentsArray}
                  onValueChange={vals => field.onChange(new Set(vals.map(v => v.value)))}
                >
                  <MultiSelectMenu>
                    <MultiSelectTrigger>Músicos</MultiSelectTrigger>
                    <MultiSelectContent>
                      <MultiSelectInput placeholder="Buscar..." />
                      <MultiSelectList>
                        <MultiSelectEmpty >
                          No se encontraron resultados.
                        </ MultiSelectEmpty>

                        <MultiSelectGroup heading="Cuerdas">
                          <MultiSelectItem value="guitar">Guitarra</MultiSelectItem>
                          <MultiSelectItem value="bass">Bajo</MultiSelectItem>
                        </MultiSelectGroup>

                        <MultiSelectGroup heading="Teclados">
                          <MultiSelectItem value="keyboard">Teclado</MultiSelectItem>
                          <MultiSelectItem value="piano">Piano</MultiSelectItem>
                        </MultiSelectGroup>

                        <MultiSelectGroup heading="Percusión">
                          <MultiSelectItem value="drums">Batería</MultiSelectItem>
                          <MultiSelectItem value="percussion">Percusión</MultiSelectItem>
                        </MultiSelectGroup>

                        <MultiSelectGroup heading="Cuerdas Clásicas">
                          <MultiSelectItem value="violin">Violín</MultiSelectItem>
                          <MultiSelectItem value="cello">Violonchelo</MultiSelectItem>
                          <MultiSelectItem value="viola">Viola</MultiSelectItem>
                        </MultiSelectGroup>

                        <MultiSelectGroup heading="Viento">
                          <MultiSelectItem value="trumpet">Trompeta</MultiSelectItem>
                          <MultiSelectItem value="saxophone">Saxofón</MultiSelectItem>
                          <MultiSelectItem value="flute">Flauta</MultiSelectItem>
                          <MultiSelectItem value="clarinet">Clarinete</MultiSelectItem>
                          <MultiSelectItem value="trombone">Trombón</MultiSelectItem>
                        </MultiSelectGroup>

                        <MultiSelectGroup heading="Voz">
                          <MultiSelectItem value="voice">Voz Principal</MultiSelectItem>
                          <MultiSelectItem value="backing_vocals">Coros</MultiSelectItem>
                        </MultiSelectGroup>
                      </MultiSelectList>
                    </MultiSelectContent>
                  </MultiSelectMenu>
                  <MultiSelectValues className="data-[sel=keyboard]:bg-red-200" />
                </MultiSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="rider"
          control={stageForm.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DynamicInputList
                  label="Rider"
                  name="rider"
                  control={stageForm.control}
                  placeholder="Ej: 2 micrófonos Shure SM58"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="backline"
          control={stageForm.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DynamicInputList
                  label="Backline"
                  name="backline"
                  control={stageForm.control}
                  placeholder="Ej: Amplificador Marshall JCM800"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="io"
          control={stageForm.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DynamicInputList
                  label="I/O"
                  name="io"
                  control={stageForm.control}
                  placeholder="Ej: Canal 1 - Guitarra eléctrica"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  )
}
