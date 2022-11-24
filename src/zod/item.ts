import * as z from "zod"
import { Decimal } from "decimal.js"

// Helper schema for Decimal fields
z
  .instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value)
    } catch (error) {
      return false
    }
  })
  .transform((value) => new Decimal(value))

export const ItemModel = z.object({
  id: z.number().int(),
  itemNumber: z.string(),
  url: z.string(),
  imageUrl: z.string(),
  name: z.string(),
  brand: z.string().nullish(),
  currencyId: z.number().int(),
  price: z.number(),
  description: z.string().nullish(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  itemTypeId: z.number().int(),
})
