import * as z from "zod"

export const ItemOnSeasonsModel = z.object({
  id: z.number().int(),
  itemId: z.number().int(),
  seasonId: z.number().int(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
