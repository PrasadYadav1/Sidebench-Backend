import { Prisma } from '@prisma/client';
import prisma from '../index';

export const getItems = async (args: Prisma.ItemFindManyArgs): Promise<object[] | Error> => {
    try {
        const data = prisma.item.findMany(args);
        return data;
    } catch (error) {
        return error as Error;
    }
};

export const getItemsCount = async (cond?: Prisma.ItemWhereInput): Promise<number | Error> => {
    try {
        const count = await prisma.item.count({ where: cond });
        return count;
    } catch (error: unknown) {
        return error as Error;
    }
};

export const getItem = async (
    where: Prisma.ItemWhereInput,
    select?: Prisma.ItemSelect,
): Promise<object | null | Error> => {
    try {
        const data = prisma.item.findFirst({ where, select });
        return data;
    } catch (error) {
        return error as Error;
    }
};
