import { Admin } from '@prisma/client';
import { RequestHandler, Response } from 'express';
import { Request } from 'express-jwt';
import { number, object, string } from 'zod';
import { getAdmin, updateAdmin } from '../db/queries';
import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INTERNAL_SERVER_ERROR,
    AdminRoleEnum,
    FORBIDDEN,
} from '../utils';

export const editAdminsName: RequestHandler = async (req: Request, res: Response) => {
    const result = object({
        id: number(),
        firstname: string().optional(),
        lastname: string().optional(),
    })
        .strip()
        .safeParse(req.body);

    if (result.success === false) {
        return BAD_REQUEST(result.error.errors, req, res);
    }

    const { userId, role } = req.auth as { userId: number; role: string };

    const { id, ...rest } = result.data;

    if (userId !== id && role !== AdminRoleEnum.superAdmin) {
        return FORBIDDEN(`You dont have access to Activate/Deactivate`, req, res);
    }

    const admin = (await getAdmin(
        { id: result.data.id, isDeleted: false },
        {
            id: true,
            email: true,
        },
    )) as Error | null | Pick<Admin, 'id' | 'email'>;

    if (admin instanceof Error) {
        return INTERNAL_SERVER_ERROR(res);
    }
    if (!admin) {
        return NOT_FOUND('Admin not found.', req, res);
    }

    const updatedRec = await updateAdmin({ id: admin.id }, { ...rest });

    if (updatedRec instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }

    return OK(`Updated successfully`, req, res);
};
