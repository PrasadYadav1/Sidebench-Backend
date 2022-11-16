import * as z from "zod"

export const LookbookModel = z.object({
  id: z.number().int(),
  customerId: z.number().int(),
  noOfLooks: z.number().int(),
  statusId: z.number().int(),
  occasion: z.string(),
  dueBy: z.date(),
  sentAt: z.date().nullish(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.number().int().nullish(),
  updatedBy: z.number().int().nullish(),
})
