import * as z from "zod"

export const ItemOnWearTypesModel = z.object({
  id: z.number().int(),
  itemId: z.number().int(),
  wearTypeId: z.number().int(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
