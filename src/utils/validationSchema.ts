import { number, object, string, TypeOf, z } from 'zod';

export const NumberType = number().or(string().regex(/^\d+$/).transform(Number));

export type NumberType = TypeOf<typeof NumberType>;

export const dateSchema = z.preprocess(arg => {
    if (typeof arg === 'string' || arg instanceof Date) {
        return new Date(arg);
    }
    return arg;
}, z.date());

export type DateSchema = z.infer<typeof dateSchema>;

export const ItemOnItemSubTypeReqBody = object({
    itemSubTypeId: number(),
});
export const ItemOnAttireTypeReqBody = object({
    attireTypeId: number(),
});

export const ItemOnWearTypeReqBody = object({
    wearTypeId: number(),
});
export const ItemOnSeasonReqBody = object({
    seasonId: number(),
});

export const ItemOnColorReqBody = object({
    colorId: number(),
});
export const ItemOnFitReqBody = object({
    fitId: number(),
});

export const ItemOnWaistLocationReqBody = object({
    waistLocationId: number(),
});

export const ItemOnKeywordReqBody = object({
    keywordId: number(),
});

export const ItemOnClothSizeReqBody = object({
    clothSizeId: number(),
});

export const ItemOnShoeSizeReqBody = object({
    shoeSizeId: number(),
});

export const ItemOnShoeHeightReqBody = object({
    shoeHeightId: number(),
});

export const ItemOnJewelryTypeReqBody = object({
    jewelryTypeId: number(),
});

export const ItemReqBody = object({
    url: string(),
    imageUrl: string(),
    name: string(),
    brand: string().optional(),
    currencyId: number(),
    price: number(),
    description: string().optional(),
    itemTypeId: number(),
    itemSubTypes: z.array(ItemOnItemSubTypeReqBody).optional(),
    itemOnAttireTypes: z.array(ItemOnAttireTypeReqBody),
    itemOnWearTypes: z.array(ItemOnWearTypeReqBody),
    itemOnSeasons: z.array(ItemOnSeasonReqBody),
    itemOnColors: z.array(ItemOnColorReqBody),
    itemOnFit: z.array(ItemOnFitReqBody),
    itemOnWaistLocation: z.array(ItemOnWaistLocationReqBody),
    itemOnKeyword: z.array(ItemOnKeywordReqBody),
    itemOnClothSize: z.array(ItemOnClothSizeReqBody).optional(),
    itemOnShoeSize: z.array(ItemOnShoeSizeReqBody).optional(),
    itemOnShoeHeight: z.array(ItemOnShoeHeightReqBody).optional(),
    itemOnJewelryType: z.array(ItemOnJewelryTypeReqBody).optional(),
});

export type ItemReqBody = TypeOf<typeof ItemReqBody>;
