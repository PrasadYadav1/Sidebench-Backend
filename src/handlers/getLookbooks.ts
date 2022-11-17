/* eslint-disable no-nested-ternary */
import { Lookbook, LookbookStatus, Prisma } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import { object, RefinementCtx, ZodIssueCode } from 'zod';
import { getLookbooks, getLookbooksCount } from '../db/queries';
import { BAD_REQUEST, dateSchema, LookbookStatusEnum, NumberType, OK } from '../utils';

export const getLookbooksData: RequestHandler = async (req: Request, res: Response) => {
    const resultQuery = object({
        noOfLooks: NumberType.optional(),
        fromDate: dateSchema.optional(),
        toDate: dateSchema.optional(),
    })
        .strip()
        .superRefine((val, ctx: RefinementCtx) => {
            if ((val.fromDate && !val.toDate) || (!val.fromDate && val.toDate)) {
                ctx.addIssue({
                    code: ZodIssueCode.custom,
                    message: 'Select both from date and to date',
                });
            }
            if (val.fromDate && val.toDate && val.fromDate > val.toDate) {
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

    let whereCondition: Prisma.LookbookWhereInput = {
        isDeleted: false,
        status: { NOT: { name: LookbookStatusEnum.completed } },
    };

    // filters

    // filter with no of looks

    if (validatedQuery.noOfLooks) {
        whereCondition = { ...whereCondition, noOfLooks: validatedQuery.noOfLooks };
    }

    // filter with dates

    if (validatedQuery.fromDate && validatedQuery.toDate) {
        whereCondition = {
            ...whereCondition,
            dueBy: {
                gte: new Date(validatedQuery.fromDate),
                lte: new Date(
                    `${validatedQuery.toDate.getFullYear()}-${
                        validatedQuery.toDate.getMonth() + 1
                    }-${validatedQuery.toDate.getDate()} 23:59:59:999`,
                ),
            },
        };
    }

    // fetch lookbooks

    const lookbooksRecords:
        | (Pick<
              Lookbook,
              'id' | 'customerId' | 'noOfLooks' | 'statusId' | 'occasion' | 'dueBy' | 'sentAt'
          > &
              {
                  status: Pick<LookbookStatus, 'id' | 'name'>;
              }[])
        | Error = await getLookbooks({
        where: whereCondition,
        select: {
            id: true,
            customerId: true,
            noOfLooks: true,
            statusId: true,
            occasion: true,
            dueBy: true,
            sentAt: true,
            status: { select: { id: true, name: true } },
        },
        orderBy: { dueBy: 'asc' },
    });

    if (lookbooksRecords instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }

    const lookbooksGrouped = Object.values(LookbookStatusEnum)
        .filter(status => status !== LookbookStatusEnum.completed)
        .map(x => [x, lookbooksRecords.filter(y => y.status.name === x)]);

    const lookbooks = Object.fromEntries(lookbooksGrouped);

    // fetch lookbooks count

    const count = await getLookbooksCount(whereCondition);

    if (count instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }
    return OK({ rows: lookbooks, count }, req, res);
};
