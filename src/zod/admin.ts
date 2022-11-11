import * as z from "zod"

export const AdminModel = z.object({
  id: z.number().int(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string().min(8, { message: 'Password length should be minimum 8 characters' }),
  salt: z.string(),
  email: z.string().email('Not a valid email'),
  roleId: z.number().int(),
  statusId: z.number().int(),
  lastActive: z.date().nullish(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.number().int().nullish(),
  updatedBy: z.number().int().nullish(),
})
