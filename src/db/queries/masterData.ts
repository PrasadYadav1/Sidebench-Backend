import prisma from '../index';

export const getMasterData = async (): Promise<object | Error> => {
    try {
        const itemTypes = await prisma.itemType.findMany({
            select: {
                id: true,
                name: true,
                typeName: true,
                itemSubType: {
                    select: {
                        id: true,
                        name: true,
                        jewelryType: { select: { id: true, name: true } },
                    },
                },
                shoeHeight: { select: { id: true, name: true } },
            },
            orderBy: { id: 'asc' },
        });
        const attireTypes = await prisma.attireType.findMany({
            select: { id: true, name: true },
            orderBy: { id: 'asc' },
        });
        const wearTypes = await prisma.wearType.findMany({
            select: { id: true, name: true },
            orderBy: { id: 'asc' },
        });
        const seasons = await prisma.season.findMany({
            select: { id: true, name: true },
            orderBy: { id: 'asc' },
        });
        const colors = await prisma.color.findMany({
            select: { id: true, name: true },
            orderBy: { id: 'asc' },
        });
        const fit = await prisma.fit.findMany({
            select: { id: true, name: true },
            orderBy: { id: 'asc' },
        });
        const waistLocations = await prisma.waistLocation.findMany({
            select: { id: true, name: true },
            orderBy: { id: 'asc' },
        });
        const keyWords = await prisma.keyWord.findMany({
            select: { id: true, name: true },
            orderBy: { id: 'asc' },
        });
        const clothSizes = await prisma.clothSize.findMany({
            select: { id: true, name: true, usa: true, uk: true, au: true, denim: true },
            orderBy: { id: 'asc' },
        });
        const shoeSizes = await prisma.shoeSize.findMany({
            select: { id: true, usa: true, uk: true },
            orderBy: { id: 'asc' },
        });
        const currencies = await prisma.currency.findMany({
            select: { id: true, country: true, name: true, code: true, symbol: true },
            orderBy: { id: 'asc' },
        });

        const data = {
            itemTypes,
            attireTypes,
            wearTypes,
            seasons,
            colors,
            fit,
            waistLocations,
            keyWords,
            clothSizes,
            shoeSizes,
            currencies,
        };
        return data;
    } catch (error) {
        return error as Error;
    }
};
