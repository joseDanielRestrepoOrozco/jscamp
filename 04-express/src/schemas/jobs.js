import * as z from 'zod'

export const DataSchema = z.object({
  technology: z.array(z.string()),
  modalidad: z.string(),
  nivel: z.string(),
})

export const ContentSchema = z.object({
  description: z.string(),
  responsibilities: z.string(),
  requirements: z.string(),
  about: z.string(),
})

export const JobSchema = z.object({
  id: z
    .string({
      error: 'El titulo es obligatorio',
    })
    .min(3, 'El titulo debe tener al menos 3 caracteres')
    .max(100, 'El titulo no puede tener mas de 100 caracteres'),
  titulo: z.string(),
  empresa: z.string(),
  ubicacion: z.string(),
  descripcion: z.string(),
  data: DataSchema,
  content: ContentSchema,
})

export const validateJob = input => JobSchema.safeParse(input)

export const validatePartialJob = input => JobSchema.partial().safeParse(input)
