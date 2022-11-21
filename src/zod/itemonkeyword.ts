import * as z from "zod"

export const ItemOnKeywordModel = z.object({
  id: z.number().int(),
  itemId: z.number().int(),
  keywordId: z.number().int(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
