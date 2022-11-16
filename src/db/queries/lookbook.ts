import { Prisma } from '@prisma/client';
import prisma from '../index';

export const getLookbooks = async (args: Prisma.LookbookFindManyArgs): Promise<any | Error> => {
    try {
        const data = prisma.lookbook.findMany(args);
        return data;
    } catch (error) {
        return error as Error;
    }
};

export const getLookbooksCount = async (
    cond?: Prisma.LookbookWhereInput,
): Promise<number | Error> => {
    try {
        const count = await prisma.lookbook.count({ where: cond });
        return count;
    } catch (error: unknown) {
        return error as Error;
    }
};
