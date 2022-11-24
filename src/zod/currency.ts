import * as z from "zod"

export const CurrencyModel = z.object({
  id: z.number().int(),
  country: z.string(),
  name: z.string(),
  code: z.string(),
  symbol: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
