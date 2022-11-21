import * as z from "zod"

export const ItemOnWaistLocationModel = z.object({
  id: z.number().int(),
  itemId: z.number().int(),
  waistLocationId: z.number().int(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
