import * as z from "zod"
import { CompleteAdminRole, RelatedAdminRoleModel, CompleteAdminStatus, RelatedAdminStatusModel } from "./index"

export const AdminModel = z.object({
  id: z.number().int(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string().min(8, { message: 'Password length should be minimum 8 characters' }),
  salt: z.string(),
  email: z.string().email('Not a valid email'),
  roleId: z.number().int(),
  statusId: z.number().int(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.number().int().nullish(),
  updatedBy: z.number().int().nullish(),
})

export interface CompleteAdmin extends z.infer<typeof AdminModel> {
  role: CompleteAdminRole
  status: CompleteAdminStatus
}

/**
 * RelatedAdminModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAdminModel: z.ZodSchema<CompleteAdmin> = z.lazy(() => AdminModel.extend({
  role: RelatedAdminRoleModel,
  status: RelatedAdminStatusModel,
}))
