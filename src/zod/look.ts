import * as z from "zod"

export const LookModel = z.object({
  id: z.number().int(),
  customerId: z.number().int(),
  lookbookId: z.number().int(),
  statusId: z.number().int(),
  occasion: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.number().int().nullish(),
  updatedBy: z.number().int().nullish(),
})
