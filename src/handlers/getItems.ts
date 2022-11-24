import { Prisma } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import { string, object, array, z, number } from 'zod';
import { getItems, getItemsCount } from '../db/queries';
import {
    BAD_REQUEST,
    defaultPageNo,
    defaultPageSize,
    getItemElasticSearch,
    NumberType,
    OK,
} from '../utils';

export const getItemsData: RequestHandler = async (req: Request, res: Response) => {
    const resultQuery = object({
        page: NumberType.optional(),
        pageSize: NumberType.optional(),
        search: string().optional(),
        itemTypeId: NumberType.optional(),
        itemSubTypeId: z.union([NumberType, z.array(NumberType)]).optional(),
        attireTypeId: z.union([NumberType, z.array(NumberType)]).optional(),
        wearTypeId: z.union([NumberType, z.array(NumberType)]).optional(),
        seasonId: z.union([NumberType, z.array(NumberType)]).optional(),
        colorId: z.union([NumberType, z.array(NumberType)]).optional(),
        fitId: z.union([NumberType, z.array(NumberType)]).optional(),
        waistLocationId: z.union([NumberType, z.array(NumberType)]).optional(),
        keywordId: z.union([NumberType, z.array(NumberType)]).optional(),
        clothSizeId: z.union([NumberType, z.array(NumberType)]).optional(),
        shoeSizeId: z.union([NumberType, z.array(NumberType)]).optional(),
        shoeHeightId: z.union([NumberType, z.array(NumberType)]).optional(),
        jewelryTypeId: z.union([NumberType, z.array(NumberType)]).optional(),
    })
        .strip()
        .safeParse(req.query);

    if (resultQuery.success === false) {
        return BAD_REQUEST(resultQuery.error.errors, req, res);
    }

    const {
        page,
        pageSize,
        search,
        itemTypeId,
        itemSubTypeId,
        attireTypeId,
        wearTypeId,
        seasonId,
        colorId,
        fitId,
        waistLocationId,
        keywordId,
        clothSizeId,
        shoeSizeId,
        shoeHeightId,
        jewelryTypeId,
    } = resultQuery.data;

    let whereCondition: Prisma.ItemWhereInput = { isDeleted: false };

    // search
    if (search) {
        whereCondition = getItemElasticSearch(search);
    }

    //  itemTypeId filter
    if (itemTypeId) {
        whereCondition = {
            ...whereCondition,
            itemTypeId,
        };
    }
    // itemSubTypeId filter
    if (itemSubTypeId) {
        whereCondition = {
            ...whereCondition,
            itemSubTypes: {
                some: {
                    itemSubTypeId:
                        typeof itemSubTypeId === 'number'
                            ? Number(itemSubTypeId)
                            : { in: itemSubTypeId },
                },
            },
        };
    }

    // attireTypeId filter
    if (attireTypeId) {
        whereCondition = {
            ...whereCondition,
            itemOnAttireTypes: {
                some: {
                    attireTypeId:
                        typeof attireTypeId === 'number'
                            ? Number(attireTypeId)
                            : { in: attireTypeId },
                },
            },
        };
    }

    // wearTypeId filter
    if (wearTypeId) {
        whereCondition = {
            ...whereCondition,
            itemOnWearTypes: {
                some: {
                    wearTypeId:
                        typeof wearTypeId === 'number' ? Number(wearTypeId) : { in: wearTypeId },
                },
            },
        };
    }

    // seasonId filter
    if (seasonId) {
        whereCondition = {
            ...whereCondition,
            itemOnSeasons: {
                some: {
                    seasonId: typeof seasonId === 'number' ? Number(seasonId) : { in: seasonId },
                },
            },
        };
    }

    // colorId filter
    if (colorId) {
        whereCondition = {
            ...whereCondition,
            itemOnColors: {
                some: { colorId: typeof colorId === 'number' ? Number(colorId) : { in: colorId } },
            },
        };
    }

    // fitId filter
    if (fitId) {
        whereCondition = {
            ...whereCondition,
            itemOnFit: {
                some: { fitId: typeof fitId === 'number' ? Number(fitId) : { in: fitId } },
            },
        };
    }

    // waistLocationId filter
    if (waistLocationId) {
        whereCondition = {
            ...whereCondition,
            itemOnWaistLocation: {
                some: {
                    waistLocationId:
                        typeof waistLocationId === 'number'
                            ? Number(waistLocationId)
                            : { in: waistLocationId },
                },
            },
        };
    }

    // keywordId filter
    if (keywordId) {
        whereCondition = {
            ...whereCondition,
            itemOnKeyword: {
                some: {
                    keywordId:
                        typeof keywordId === 'number' ? Number(keywordId) : { in: keywordId },
                },
            },
        };
    }

    // clothSizeId filter
    if (clothSizeId) {
        whereCondition = {
            ...whereCondition,
            itemOnClothSize: {
                some: {
                    clothSizeId:
                        typeof clothSizeId === 'number' ? Number(clothSizeId) : { in: clothSizeId },
                },
            },
        };
    }

    // shoeSizeId filter
    if (shoeSizeId) {
        whereCondition = {
            ...whereCondition,
            itemOnShoeSize: {
                some: {
                    shoeSizeId:
                        typeof shoeSizeId === 'number' ? Number(shoeSizeId) : { in: shoeSizeId },
                },
            },
        };
    }

    // shoeHeightId filter
    if (shoeHeightId) {
        whereCondition = {
            ...whereCondition,
            itemOnShoeHeight: {
                some: {
                    shoeHeightId:
                        typeof shoeHeightId === 'number'
                            ? Number(shoeHeightId)
                            : { in: shoeHeightId },
                },
            },
        };
    }

    // jewelryTypeId filter
    if (jewelryTypeId) {
        whereCondition = {
            ...whereCondition,
            itemOnJewelryType: {
                some: {
                    jewelryTypeId:
                        typeof jewelryTypeId === 'number'
                            ? Number(jewelryTypeId)
                            : { in: jewelryTypeId },
                },
            },
        };
    }

    // fetch items
    const items = await getItems({
        skip: (page ?? defaultPageNo - 1) * (pageSize ?? defaultPageSize),
        take: pageSize,
        select: {
            id: true,
            itemNumber: true,
            url: true,
            imageUrl: true,
            name: true,
            brand: true,
            currencyId: true,
            currency: { select: { id: true, country: true, name: true, code: true, symbol: true } },
            price: true,
            description: true,
            itemTypeId: true,
            itemType: { select: { name: true } },
        },
        where: whereCondition,
    });

    if (items instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }

    // fetch items count
    const count = await getItemsCount(whereCondition);

    if (count instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }
    return OK({ rows: items, count }, req, res);
};

export default getItemsData;
