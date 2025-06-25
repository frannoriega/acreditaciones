import z from "zod/v4";

export const stageDataSchema = z.object({
  rider: z.string(),
  backline: z.string(),
  io: z.string().optional()
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
  instruments: z.map(
    z.enum(["guitar", "keyboard"]),
    z.number()
  ).refine(m => m.size == 0 || m.values().some(v => v > 0), { error: "Seleccione al menos un músico" }),
  fee: z.coerce.number({
    error: "Ingrese un número"
  }).nonnegative("Ingrese un número positivo"),
  rider: z.file({
    error: "Ingrese un archivo"
  }),
  backline: z.file("Ingrese un archivo en formato PDF o imagen"),
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
