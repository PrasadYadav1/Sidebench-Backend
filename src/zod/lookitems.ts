import * as z from "zod"

export const LookItemsModel = z.object({
  id: z.number().int(),
  lookId: z.number().int(),
  itemId: z.number().int(),
  isPrimary: z.boolean(),
  message: z.string().nullish(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.number().int().nullish(),
  updatedBy: z.number().int().nullish(),
})
