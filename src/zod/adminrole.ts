import * as z from "zod"
import { CompleteAdmin, RelatedAdminModel } from "./index"

export const AdminRoleModel = z.object({
  id: z.number().int(),
  name: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteAdminRole extends z.infer<typeof AdminRoleModel> {
  admins: CompleteAdmin[]
}

/**
 * RelatedAdminRoleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAdminRoleModel: z.ZodSchema<CompleteAdminRole> = z.lazy(() => AdminRoleModel.extend({
  admins: RelatedAdminModel.array(),
}))
