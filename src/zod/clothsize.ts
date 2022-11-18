import * as z from "zod"

export const ClothSizeModel = z.object({
  id: z.number().int(),
  name: z.string(),
  usa: z.string(),
  uk: z.string(),
  au: z.string(),
  denim: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
