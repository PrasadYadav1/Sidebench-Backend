/* eslint-disable no-console */
import { RequestHandler, Request, Response } from 'express';
import { compare } from 'bcrypt';
import { Admin, AdminStatus, AdminRole } from '@prisma/client';
import {
    OK,
    NOT_FOUND,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED,
    auth,
    AdminStatus as AdminStatusEnum,
} from '../utils';
import { getAdmin, updateAdmin } from '../db/queries';
import { AdminModel } from '../zod/admin';

export const login: RequestHandler = async (req: Request, res: Response) => {
    const reqBody = AdminModel.pick({ password: true, email: true }).safeParse(req.body);
    if (reqBody.success === false) {
        return BAD_REQUEST(reqBody.error.errors, req, res);
    }
    const admin = (await getAdmin(
        { email: reqBody.data.email, isDeleted: false },
        {
            firstname: true,
            lastname: true,
            password: true,
            role: { select: { name: true, id: true } },
            status: { select: { name: true, id: true } },
            id: true,
            email: true,
        },
    )) as
        | Error
        | null
        | (Pick<Admin, 'id' | 'firstname' | 'lastname' | 'password' | 'email'> & {
              status: Pick<AdminStatus, 'name'>;
          } & { role: Pick<AdminRole, 'name'> });

    if (admin instanceof Error) {
        return INTERNAL_SERVER_ERROR(res);
    }
    if (!admin) {
        return NOT_FOUND('Your credentials do not match our records. Please try again.', req, res);
    }
    const { password, ...rest } = admin;
    if (rest.status.name === AdminStatusEnum.deactivated) {
        return UNAUTHORIZED(
            {
                code: 'account_disabled',
                message: 'Your account has been disabled. Please contact admin.',
            },
            req,
            res,
        );
    }
    if (!(await compare(reqBody.data.password, password))) {
        return UNAUTHORIZED(
            {
                code: 'invalid_credentials',
                message: 'Your credentials do not match our records. Please try again.',
            },
            req,
            res,
        );
    }

    const updatedTimeRec = await updateAdmin({ id: admin.id }, { lastActive: new Date() });

    if (updatedTimeRec instanceof Error) {
        return INTERNAL_SERVER_ERROR(res);
    }

    return OK(
        { ...rest, token: auth.default(rest.id, rest.email, rest.role.name, 86400) },
        req,
        res,
    );
};
