import * as z from "zod"

export const ItemModel = z.object({
  id: z.number().int(),
  url: z.string(),
  imageUrl: z.string(),
  name: z.string(),
  price: z.number().int(),
  itemType: z.number().int().array(),
  attireType: z.number().int().array(),
  wearType: z.number().int().array(),
  season: z.number().int().array(),
  color: z.number().int().array(),
  fit: z.number().int().array(),
  waistLocation: z.number().int().array(),
  keyword: z.number().int().array(),
  sizeAvailable: z.number().int().array(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
