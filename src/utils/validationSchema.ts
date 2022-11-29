import { boolean, number, object, string, TypeOf, z } from 'zod';

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
    id: number().optional(),
    itemSubTypeId: number(),
    isDeleted: boolean().optional(),
});
export const ItemOnAttireTypeReqBody = object({
    id: number().optional(),
    attireTypeId: number(),
    isDeleted: boolean().optional(),
});

export const ItemOnWearTypeReqBody = object({
    id: number().optional(),
    wearTypeId: number(),
    isDeleted: boolean().optional(),
});
export const ItemOnSeasonReqBody = object({
    id: number().optional(),
    seasonId: number(),
    isDeleted: boolean().optional(),
});

export const ItemOnColorReqBody = object({
    id: number().optional(),
    colorId: number(),
    isDeleted: boolean().optional(),
});
export const ItemOnFitReqBody = object({
    id: number().optional(),
    fitId: number(),
    isDeleted: boolean().optional(),
});

export const ItemOnWaistLocationReqBody = object({
    id: number().optional(),
    waistLocationId: number(),
    isDeleted: boolean().optional(),
});

export const ItemOnKeywordReqBody = object({
    id: number().optional(),
    keywordId: number(),
    isDeleted: boolean().optional(),
});

export const ItemOnClothSizeReqBody = object({
    id: number().optional(),
    clothSizeId: number(),
    isDeleted: boolean().optional(),
});

export const ItemOnShoeSizeReqBody = object({
    id: number().optional(),
    shoeSizeId: number(),
    isDeleted: boolean().optional(),
});

export const ItemOnShoeHeightReqBody = object({
    id: number().optional(),
    shoeHeightId: number(),
    isDeleted: boolean().optional(),
});

export const ItemOnJewelryTypeReqBody = object({
    id: number().optional(),
    jewelryTypeId: number(),
    isDeleted: boolean().optional(),
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

export const EditItemReqBody = object({
    id: number(),
    url: string().optional(),
    imageUrl: string().optional(),
    name: string().optional(),
    brand: string().optional(),
    currencyId: number().optional(),
    price: number().optional(),
    description: string().optional(),
    itemTypeId: number().optional(),
    itemSubTypes: z.array(ItemOnItemSubTypeReqBody).optional(),
    itemOnAttireTypes: z.array(ItemOnAttireTypeReqBody).optional(),
    itemOnWearTypes: z.array(ItemOnWearTypeReqBody).optional(),
    itemOnSeasons: z.array(ItemOnSeasonReqBody).optional(),
    itemOnColors: z.array(ItemOnColorReqBody).optional(),
    itemOnFit: z.array(ItemOnFitReqBody).optional(),
    itemOnWaistLocation: z.array(ItemOnWaistLocationReqBody).optional(),
    itemOnKeyword: z.array(ItemOnKeywordReqBody).optional(),
    itemOnClothSize: z.array(ItemOnClothSizeReqBody).optional(),
    itemOnShoeSize: z.array(ItemOnShoeSizeReqBody).optional(),
    itemOnShoeHeight: z.array(ItemOnShoeHeightReqBody).optional(),
    itemOnJewelryType: z.array(ItemOnJewelryTypeReqBody).optional(),
});

export type EditItemReqBody = TypeOf<typeof EditItemReqBody>;
