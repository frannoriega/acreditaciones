import z from "zod/v4";

export const stageDataSchema = z.object({
  instruments: z.set(
    z.enum([
      "guitar", "bass", "keyboard", "piano", "drums", "percussion", 
      "violin", "cello", "viola", "trumpet", "saxophone", "flute", 
      "clarinet", "trombone", "voice", "backing_vocals"
    ]),
  ).nonempty({ error: "Seleccione al menos un músico" }),
  rider: z.array(z.string()).refine(
    (arr) => arr.some(item => item.trim() !== ''),
    { message: "Debe agregar al menos un elemento al rider" }
  ),
  backline: z.array(z.string()).refine(
    (arr) => arr.some(item => item.trim() !== ''),
    { message: "Debe agregar al menos un elemento al backline" }
  ),
  io: z.array(z.string()).optional().default([])
})

export const newBandFormSchema = z.object({
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
  stage: z.array(
    z.object({
      coords: z.object({
        x: z.number().nonnegative(),
        y: z.number().nonnegative()
      }),
      data: stageDataSchema
    })
  ),
})
