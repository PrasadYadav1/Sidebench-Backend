import * as z from "zod"

export const ItemOnClothSizeModel = z.object({
  id: z.number().int(),
  itemId: z.number().int(),
  clothSizeId: z.number().int(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
