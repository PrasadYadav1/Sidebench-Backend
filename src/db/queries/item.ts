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

export const saveItem = async (
    reqData: Prisma.ItemUncheckedCreateInput,
): Promise<object | null | Error> => {
    try {
        const item = await prisma.item.create({ data: reqData });
        return item;
    } catch (error: unknown) {
        return error as Error;
    }
};

export const getItemMaxId = async (): Promise<number | Error> => {
    try {
        const item = await prisma.item.findMany({
            select: { id: true },
            orderBy: { createdAt: 'desc' },
            take: 1,
        });
        const max = item.length > 0 ? item[0].id + 1 : 1;
        return max;
    } catch (error: unknown) {
        return error as Error;
    }
};

export const updateItem = async (
    cond: Prisma.ItemWhereUniqueInput,
    data: Prisma.ItemUncheckedUpdateInput,
    select?: Prisma.ItemSelect,
): Promise<object | null | Error> => {
    try {
        const admin = await prisma.item.update({
            where: cond,
            data,
            select: select || { id: true },
        });
        return admin;
    } catch (error: unknown) {
        return error as Error;
    }
};
