import * as z from "zod"

export const ShoeSizeModel = z.object({
  id: z.number().int(),
  usa: z.string(),
  uk: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
