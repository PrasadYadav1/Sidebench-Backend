import * as z from "zod"
import { CompleteAdmin, RelatedAdminModel } from "./index"

export const AdminStatusModel = z.object({
  id: z.number().int(),
  name: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteAdminStatus extends z.infer<typeof AdminStatusModel> {
  admins: CompleteAdmin[]
}

/**
 * RelatedAdminStatusModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAdminStatusModel: z.ZodSchema<CompleteAdminStatus> = z.lazy(() => AdminStatusModel.extend({
  admins: RelatedAdminModel.array(),
}))
