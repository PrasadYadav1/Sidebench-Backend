import { Request, RequestHandler, Response } from 'express';
import { getItemMaxId, saveItem } from '../db/queries';
import { ItemReqBody, BAD_REQUEST, OK } from '../utils';
import { leadingZero } from '../utils/leadingZero';

export const createItem: RequestHandler = async (req: Request, res: Response) => {
    const result = ItemReqBody.safeParse(req.body);

    if (result.success === false) {
        return BAD_REQUEST(result.error.errors, req, res);
    }

    const rest = result.data;

    const maxId = await getItemMaxId();

    if (maxId instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }
    const itemNumber = `SKU${leadingZero(maxId)}`;

    const data = await saveItem({
        itemNumber,
        url: rest.url,
        imageUrl: rest.imageUrl,
        name: rest.name,
        brand: rest.brand,
        currencyId: rest.currencyId,
        price: rest.price,
        description: rest.description,
        itemTypeId: rest.itemTypeId,
        itemSubTypes: rest.itemSubTypes
            ? {
                  create: rest.itemSubTypes.map(i => ({
                      itemSubTypeId: i.itemSubTypeId,
                  })),
              }
            : undefined,
        itemOnAttireTypes: {
            create: rest.itemOnAttireTypes.map(i => ({
                attireTypeId: i.attireTypeId,
            })),
        },
        itemOnWearTypes: {
            create: rest.itemOnWearTypes.map(i => ({
                wearTypeId: i.wearTypeId,
            })),
        },
        itemOnSeasons: {
            create: rest.itemOnSeasons.map(i => ({
                seasonId: i.seasonId,
            })),
        },
        itemOnColors: {
            create: rest.itemOnColors.map(i => ({
                colorId: i.colorId,
            })),
        },
        itemOnFit: {
            create: rest.itemOnFit.map(i => ({
                fitId: i.fitId,
            })),
        },
        itemOnWaistLocation: {
            create: rest.itemOnWaistLocation.map(i => ({
                waistLocationId: i.waistLocationId,
            })),
        },
        itemOnKeyword: {
            create: rest.itemOnKeyword.map(i => ({
                keywordId: i.keywordId,
            })),
        },

        itemOnClothSize: rest.itemOnClothSize
            ? {
                  create: rest.itemOnClothSize.map(i => ({
                      clothSizeId: i.clothSizeId,
                  })),
              }
            : undefined,

        itemOnShoeSize: rest.itemOnShoeSize
            ? {
                  create: rest.itemOnShoeSize.map(i => ({
                      shoeSizeId: i.shoeSizeId,
                  })),
              }
            : undefined,
        itemOnShoeHeight: rest.itemOnShoeHeight
            ? {
                  create: rest.itemOnShoeHeight.map(i => ({
                      shoeHeightId: i.shoeHeightId,
                  })),
              }
            : undefined,

        itemOnJewelryType: rest.itemOnJewelryType
            ? {
                  create: rest.itemOnJewelryType.map(i => ({
                      jewelryTypeId: i.jewelryTypeId,
                  })),
              }
            : undefined,
    });

    if (data instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }

    return OK(data, req, res);
};
