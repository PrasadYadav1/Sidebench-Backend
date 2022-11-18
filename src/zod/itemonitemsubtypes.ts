import * as z from "zod"

export const ItemOnItemSubTypesModel = z.object({
  id: z.number().int(),
  itemId: z.number().int(),
  itemSubTypeId: z.number().int(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
