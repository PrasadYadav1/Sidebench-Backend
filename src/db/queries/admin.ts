import { Prisma } from '@prisma/client';
import prisma from '../index';

export const getAdmin = async (
    where: Prisma.AdminWhereInput,
    select?: Prisma.AdminSelect,
): Promise<Record<string, unknown> | null | Error> => {
    try {
        const data = prisma.admin.findFirst({ where, select });
        return data;
    } catch (error) {
        return error as Error;
    }
};

export const updateAdmin = async (
    cond: Prisma.AdminWhereUniqueInput,
    data: Prisma.AdminUncheckedUpdateInput,
    select?: Prisma.AdminSelect,
): Promise<object | null | Error> => {
    try {
        const admin = await prisma.admin.update({
            where: cond,
            data,
            select: select || { id: true },
        });
        return admin;
    } catch (error: unknown) {
        return error as Error;
    }
};

export const getAdmins = async (args: Prisma.AdminFindManyArgs): Promise<object[] | Error> => {
    try {
        const data = prisma.admin.findMany(args);
        return data;
    } catch (error) {
        return error as Error;
    }
};

export const getAdminsCount = async (cond?: Prisma.AdminWhereInput): Promise<number | Error> => {
    try {
        const count = await prisma.admin.count({ where: cond });
        return count;
    } catch (error: unknown) {
        return error as Error;
    }
};
