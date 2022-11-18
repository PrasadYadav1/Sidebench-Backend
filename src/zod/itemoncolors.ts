import * as z from "zod"

export const ItemOnColorsModel = z.object({
  id: z.number().int(),
  itemId: z.number().int(),
  colorId: z.number().int(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
