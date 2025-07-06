import z from "zod/v4";

export const newFoodtruckFormSchema = z.object({
  foodtruckName: z.string().min(3, "Ingrese al menos 3 caracteres").max(100, "El nombre no puede exceder 100 caracteres"),
  employees: z.coerce.number({
    error: "Ingrese un número"
  }).nonnegative("Ingrese un número positivo").max(100, "No puede tener más de 100 empleados"),
  cuisineType: z.string().nonempty("Seleccione un tipo de cocina").max(100, "El tipo de cocina no puede exceder 100 caracteres"),
  menuItems: z.array(z.string().min(1, "No puede estar vacío")).min(1, "Debe ingresar al menos un platillo"),
  lot: z.string().optional(),
}) 