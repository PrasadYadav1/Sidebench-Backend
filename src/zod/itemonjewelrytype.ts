import * as z from "zod"

export const ItemOnJewelryTypeModel = z.object({
  id: z.number().int(),
  itemId: z.number().int(),
  jewelryTypeId: z.number().int(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
