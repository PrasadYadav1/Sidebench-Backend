import {
    AttireType,
    Color,
    Fit,
    Item,
    ItemType,
    Season,
    WaistLocation,
    WearType,
    KeyWord,
    ShoeHeight,
    JewelryType,
    ClothSize,
    ShoeSize,
    ItemSubType,
    Currency,
} from '@prisma/client';
import { RequestHandler, Response } from 'express';
import { Request } from 'express-jwt';
import { object } from 'zod';
import { getItem } from '../db/queries';
import { BAD_REQUEST, NOT_FOUND, OK, INTERNAL_SERVER_ERROR, NumberType } from '../utils';

export const getItemDetails: RequestHandler = async (req: Request, res: Response) => {
    const result = object({ id: NumberType }).safeParse(req.params);

    if (result.success === false) {
        return BAD_REQUEST(result.error.errors, req, res);
    }

    const item = (await getItem(
        { id: result.data.id, isDeleted: false },
        {
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
            itemType: { select: { id: true, name: true, typeName: true } },
            itemSubTypes: {
                select: {
                    itemSubType: {
                        select: {
                            id: true,
                            name: true,
                            itemType: { select: { id: true, name: true, typeName: true } },
                        },
                    },
                },
            },
            itemOnAttireTypes: { select: { attireType: { select: { id: true, name: true } } } },
            itemOnWearTypes: { select: { wearType: { select: { id: true, name: true } } } },
            itemOnSeasons: { select: { season: { select: { id: true, name: true } } } },
            itemOnColors: { select: { color: { select: { id: true, name: true } } } },
            itemOnFit: { select: { fit: { select: { id: true, name: true } } } },
            itemOnWaistLocation: {
                select: { waistLocation: { select: { id: true, name: true } } },
            },
            itemOnKeyword: { select: { keyword: { select: { id: true, name: true } } } },
            itemOnClothSize: {
                select: { clothSize: { select: { id: true, name: true, usa: true, uk: true } } },
            },
            itemOnShoeSize: { select: { shoeSize: { select: { id: true, usa: true, uk: true } } } },
            itemOnShoeHeight: { select: { shoeHeight: { select: { id: true, name: true } } } },
            itemOnJewelryType: { select: { jewelryType: { select: { id: true, name: true } } } },
        },
    )) as
        | Error
        | null
        | (Pick<
              Item,
              | 'id'
              | 'itemNumber'
              | 'url'
              | 'imageUrl'
              | 'name'
              | 'brand'
              | 'currencyId'
              | 'price'
              | 'description'
          > & {
              currency: Pick<Currency, 'id' | 'country' | 'name' | 'code' | 'symbol'>;
          } & {
              itemType: Pick<ItemType, 'id' | 'name' | 'typeName'>;
          } & {
              itemSubTypes: {
                  itemSubType: Pick<ItemSubType, 'id' | 'name'> & {
                      itemType: Pick<ItemType, 'id' | 'name' | 'typeName'>;
                  };
              };
          } & {
              itemOnAttireTypes: { attireType: Pick<AttireType, 'id' | 'name'> }[];
          } & {
              itemOnWearTypes: { wearType: Pick<WearType, 'id' | 'name'> }[];
          } & { itemOnSeasons: { season: Pick<Season, 'id' | 'name'> }[] } & {
              itemOnColors: { color: Pick<Color, 'id' | 'name'> }[];
          } & { itemOnFit: { fit: Pick<Fit, 'id' | 'name'> }[] } & {
              itemOnWaistLocation: { waistLocation: Pick<WaistLocation, 'id' | 'name'> }[];
          } & { itemOnKeyword: { keyword: Pick<KeyWord, 'id' | 'name'> }[] } & {
              itemOnClothSize: { clothSize: Pick<ClothSize, 'id' | 'name' | 'usa' | 'uk'> };
          } & {
              itemOnShoeSize: { shoeSize: Pick<ShoeSize, 'id' | 'usa' | 'uk'> };
          } & {
              itemOnShoeHeight: { shoeHeight: Pick<ShoeHeight, 'id' | 'name'> }[];
          } & { itemOnJewelryType: { jewelryType: Pick<JewelryType, 'id' | 'name'> }[] });

    if (item instanceof Error) {
        return INTERNAL_SERVER_ERROR(res);
    }
    if (!item) {
        return NOT_FOUND('Item not found.', req, res);
    }

    return OK(item, req, res);
};
