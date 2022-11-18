import * as z from "zod"

export const ItemOnShoeHeightModel = z.object({
  id: z.number().int(),
  itemId: z.number().int(),
  shoeHeightId: z.number().int(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
