import { Admin } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { Request, RequestHandler, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { object, string, ZodIssueCode } from 'zod';
import { getAdmin, updateAdmin } from '../db/queries';
import { BAD_REQUEST, NOT_FOUND, OK } from '../utils';

export const updateAdminPassword: RequestHandler = async (req: Request, res: Response) => {
    const result = object({
        token: string(),
        password: string().min(8, 'Password must be at least 8 characters long'),
        confirmPassword: string().min(8, 'Password must be at least 8 characters long'),
    })
        .superRefine((val, ctx) => {
            if (val.password !== val.confirmPassword) {
                ctx.addIssue({
                    code: ZodIssueCode.custom,
                    path: ['confirmPassword'],
                    message: 'Password and Confirm password does not match',
                });
            }
        })
        .safeParse(req.body);
    if (result.success === false) {
        return BAD_REQUEST(result.error.errors, req, res);
    }

    let verifiedToken: { email?: string; iat?: number; exp?: number } = {};

    try {
        verifiedToken = verify(result.data.token, process.env.RESET_TOKEN_SECRET ?? '', {
            ignoreExpiration: false,
        }) as unknown as { email: string };
    } catch (err) {
        return res.status(500).json({ errors: (err as { message: string }).message });
    }

    const admin = (await getAdmin(
        { email: verifiedToken.email, isDeleted: false },
        { id: true, email: true },
    )) as Error | null | Pick<Admin, 'id' | 'email'>;

    if (admin instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }

    if (!admin) {
        return NOT_FOUND('Admin not found', req, res);
    }

    const salt = await genSalt(10);

    const hashPassword = await hash(result.data.password, salt);

    const data = await updateAdmin({ id: admin.id }, { password: hashPassword, salt });

    if (data instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }

    return OK(`Updated Successfully`, req, res);
};
