import { Admin } from '@prisma/client';
import { RequestHandler, Response } from 'express';
import { Request } from 'express-jwt';
import { object } from 'zod';
import { getAdmin, updateAdmin } from '../db/queries';
import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INTERNAL_SERVER_ERROR,
    AdminRoleEnum,
    FORBIDDEN,
    NumberType,
} from '../utils';

export const deleteAdmin: RequestHandler = async (req: Request, res: Response) => {
    const result = object({ id: NumberType }).safeParse(req.params);

    if (result.success === false) {
        return BAD_REQUEST(result.error.errors, req, res);
    }

    const { role } = req.auth as { role: string };

    if (role !== AdminRoleEnum.superAdmin) {
        return FORBIDDEN(`You dont have access to delete other admins`, req, res);
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

    const updatedRec = await updateAdmin({ id: admin.id }, { isDeleted: true });

    if (updatedRec instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }

    return OK(`Admin deleted successfully`, req, res);
};
