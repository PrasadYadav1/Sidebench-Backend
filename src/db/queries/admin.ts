import { Prisma } from '@prisma/client';
import prisma from '../index';

export const getAdmin = async (
    where: Prisma.AdminWhereInput,
    select?: Prisma.AdminSelect,
): Promise<{} | null | Error> => {
    try {
        const data = prisma.admin.findFirst({ where, select });
        return data;
    } catch (error) {
        return error as Error;
    }
};
