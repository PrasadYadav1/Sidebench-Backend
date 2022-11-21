import * as z from "zod"

export const ItemOnShoeSizeModel = z.object({
  id: z.number().int(),
  itemId: z.number().int(),
  shoeSizeId: z.number().int(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
