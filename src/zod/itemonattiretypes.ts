import * as z from "zod"

export const ItemOnAttireTypesModel = z.object({
  id: z.number().int(),
  itemId: z.number().int(),
  attireTypeId: z.number().int(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
