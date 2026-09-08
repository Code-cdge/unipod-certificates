import z from 'zod'

export const codeSchema = z.object({
  code: z.string().nonempty('El código es requerido'),
})
