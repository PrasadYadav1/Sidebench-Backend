import * as z from "zod"

export const ItemModel = z.object({
  id: z.number().int(),
  url: z.string(),
  imageUrl: z.string(),
  name: z.string(),
  price: z.number().int(),
  sizeAvailable: z.number().int().array(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  itemTypeId: z.number().int(),
})
