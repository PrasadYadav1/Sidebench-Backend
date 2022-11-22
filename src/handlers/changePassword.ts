import { Admin } from '@prisma/client';
import { compare, genSalt, hash } from 'bcrypt';
import { RequestHandler, Response } from 'express';
import { Request } from 'express-jwt';
import { object, string, ZodIssueCode } from 'zod';
import { getAdmin, updateAdmin } from '../db/queries';
import { BAD_REQUEST, NOT_FOUND, OK, INTERNAL_SERVER_ERROR, CONFLICT } from '../utils';

export const changePassword: RequestHandler = async (req: Request, res: Response) => {
    const result = object({
        password: string().min(8, 'Password must be atleast 8 characters long'),
        confirmPasswrd: string().min(8, 'Password must be atleast 8 characters long'),
    })
        .strip()
        .superRefine((val, ctx) => {
            if (val.password !== val.confirmPasswrd) {
                ctx.addIssue({
                    code: ZodIssueCode.custom,
                    path: ['confirmPasswrd'],
                    message: 'Password and Confirm password does not match',
                });
            }
        })
        .safeParse(req.body);

    if (result.success === false) {
        return BAD_REQUEST(result.error.errors, req, res);
    }

    const { userId } = req.auth as { userId: number };

    const admin = (await getAdmin(
        { id: userId, isDeleted: false },
        {
            id: true,
            email: true,
            statusId: true,
            password: true,
        },
    )) as Error | null | Pick<Admin, 'id' | 'email' | 'statusId' | 'password'>;

    if (admin instanceof Error) {
        return INTERNAL_SERVER_ERROR(res);
    }
    if (!admin) {
        return NOT_FOUND('Admin not found.', req, res);
    }

    if (await compare(result.data.password, admin.password)) {
        return CONFLICT('Please use a different password than the previous one', req, res);
    }

    const salt = await genSalt(10);

    const hashPassword = await hash(result.data.password, salt);

    const updatedRec = await updateAdmin(
        { id: admin.id },
        { salt, password: hashPassword, statusId: admin.statusId === 1 ? 2 : undefined },
    );

    if (updatedRec instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }

    return OK(`Updated successfully`, req, res);
};
