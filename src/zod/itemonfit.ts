import * as z from "zod"

export const ItemOnFitModel = z.object({
  id: z.number().int(),
  itemId: z.number().int(),
  fitId: z.number().int(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
