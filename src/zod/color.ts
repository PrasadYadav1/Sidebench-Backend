import * as z from "zod"

export const ColorModel = z.object({
  id: z.number().int(),
  name: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
