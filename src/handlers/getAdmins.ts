/* eslint-disable no-nested-ternary */
import { Prisma } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import { string, object, RefinementCtx, ZodIssueCode } from 'zod';
import { getAdmins, getAdminsCount } from '../db/queries';
import { BAD_REQUEST, dateSchema, defaultPageNo, defaultPageSize, NumberType, OK } from '../utils';

export const getAdminsData: RequestHandler = async (req: Request, res: Response) => {
    const resultQuery = object({
        page: NumberType.optional(),
        pageSize: NumberType.optional(),
        search: string().optional(),
        statusId: NumberType.optional(),
        activeFrom: dateSchema.optional(),
        activeTo: dateSchema.optional(),
    })
        .strip()
        .superRefine((val, ctx: RefinementCtx) => {
            if ((val.activeFrom && !val.activeTo) || (!val.activeFrom && val.activeTo)) {
                ctx.addIssue({
                    code: ZodIssueCode.custom,
                    message: 'Select both from date and to date',
                });
            }
            if (val.activeFrom && val.activeTo && val.activeFrom > val.activeTo) {
                ctx.addIssue({
                    code: ZodIssueCode.custom,
                    message: 'From date is greater than to date',
                });
            }
        })
        .safeParse(req.query);

    if (resultQuery.success === false) {
        return BAD_REQUEST(resultQuery.error.errors, req, res);
    }

    const validatedQuery = resultQuery.data;

    // pagination
    const pageSize = validatedQuery.pageSize ?? defaultPageSize;
    const page = validatedQuery.page ?? defaultPageNo;

    let whereCondition: Prisma.AdminWhereInput = { isDeleted: false };

    // search
    if (validatedQuery.search) {
        whereCondition = {
            ...whereCondition,
            OR: [
                {
                    firstname: { contains: validatedQuery.search },
                },
                {
                    lastname: { contains: validatedQuery.search },
                },
                {
                    email: { contains: validatedQuery.search },
                },
            ],
        };
    }

    // filters

    //  status filter
    if (validatedQuery.statusId) {
        whereCondition = {
            ...whereCondition,
            statusId: validatedQuery.statusId,
        };
    }

    // date filter

    if (validatedQuery.activeFrom && validatedQuery.activeTo) {
        whereCondition = {
            ...whereCondition,
            lastActive: {
                gte: new Date(validatedQuery.activeFrom),
                lte: new Date(
                    `${validatedQuery.activeTo.getFullYear()}-${
                        validatedQuery.activeTo.getMonth() + 1
                    }-${validatedQuery.activeTo.getDate()} 23:59:59:999`,
                ),
            },
        };
    }

    // fetch admins

    const admins = await getAdmins({
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            roleId: true,
            statusId: true,
            lastActive: true,
            role: { select: { name: true } },
            status: { select: { name: true } },
        },
        where: whereCondition,
    });

    if (admins instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }

    // fetch admins count

    const count = await getAdminsCount(whereCondition);

    if (count instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }
    return OK({ rows: admins, count }, req, res);
};

export default getAdminsData;
