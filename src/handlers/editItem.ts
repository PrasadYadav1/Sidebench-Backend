import { Item } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import { getItem, updateItem } from '../db/queries';
import { BAD_REQUEST, OK, EditItemReqBody, INTERNAL_SERVER_ERROR, NOT_FOUND } from '../utils';

export const editItemData: RequestHandler = async (req: Request, res: Response) => {
    const result = EditItemReqBody.safeParse(req.body);

    if (result.success === false) {
        return BAD_REQUEST(result.error.errors, req, res);
    }

    const { id, ...rest } = result.data;

    const item = (await getItem({ id: result.data.id, isDeleted: false })) as Error | null | Item;

    if (item instanceof Error) {
        return INTERNAL_SERVER_ERROR(res);
    }
    if (!item) {
        return NOT_FOUND('Item not found.', req, res);
    }

    const data = await updateItem(
        { id },
        {
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
                      upsert: rest.itemSubTypes.map(i => ({
                          where: { id: i.id ? i.id : 0 },
                          update: {
                              itemSubTypeId: i.itemSubTypeId,
                              isDeleted: i.isDeleted ? i.isDeleted : false,
                          },
                          create: { itemSubTypeId: i.itemSubTypeId },
                      })),
                  }
                : undefined,
            itemOnAttireTypes: rest.itemOnAttireTypes
                ? {
                      upsert: rest.itemOnAttireTypes.map(i => ({
                          where: { id: i.id ? i.id : 0 },
                          update: {
                              attireTypeId: i.attireTypeId,
                              isDeleted: i.isDeleted ? i.isDeleted : false,
                          },
                          create: { attireTypeId: i.attireTypeId },
                      })),
                  }
                : undefined,
            itemOnWearTypes: rest.itemOnWearTypes
                ? {
                      upsert: rest.itemOnWearTypes.map(i => ({
                          where: { id: i.id ? i.id : 0 },
                          update: {
                              wearTypeId: i.wearTypeId,
                              isDeleted: i.isDeleted ? i.isDeleted : false,
                          },
                          create: { wearTypeId: i.wearTypeId },
                      })),
                  }
                : undefined,
            itemOnSeasons: rest.itemOnSeasons
                ? {
                      upsert: rest.itemOnSeasons.map(i => ({
                          where: { id: i.id ? i.id : 0 },
                          update: {
                              seasonId: i.seasonId,
                              isDeleted: i.isDeleted ? i.isDeleted : false,
                          },
                          create: { seasonId: i.seasonId },
                      })),
                  }
                : undefined,

            itemOnColors: rest.itemOnColors
                ? {
                      upsert: rest.itemOnColors.map(i => ({
                          where: { id: i.id ? i.id : 0 },
                          update: {
                              colorId: i.colorId,
                              isDeleted: i.isDeleted ? i.isDeleted : false,
                          },
                          create: { colorId: i.colorId },
                      })),
                  }
                : undefined,
            itemOnFit: rest.itemOnFit
                ? {
                      upsert: rest.itemOnFit.map(i => ({
                          where: { id: i.id ? i.id : 0 },
                          update: {
                              fitId: i.fitId,
                              isDeleted: i.isDeleted ? i.isDeleted : false,
                          },
                          create: { fitId: i.fitId },
                      })),
                  }
                : undefined,
            itemOnWaistLocation: rest.itemOnWaistLocation
                ? {
                      upsert: rest.itemOnWaistLocation.map(i => ({
                          where: { id: i.id ? i.id : 0 },
                          update: {
                              waistLocationId: i.waistLocationId,
                              isDeleted: i.isDeleted ? i.isDeleted : false,
                          },
                          create: { waistLocationId: i.waistLocationId },
                      })),
                  }
                : undefined,
            itemOnKeyword: rest.itemOnKeyword
                ? {
                      upsert: rest.itemOnKeyword.map(i => ({
                          where: { id: i.id ? i.id : 0 },
                          update: {
                              keywordId: i.keywordId,
                              isDeleted: i.isDeleted ? i.isDeleted : false,
                          },
                          create: { keywordId: i.keywordId },
                      })),
                  }
                : undefined,
            itemOnClothSize: rest.itemOnClothSize
                ? {
                      upsert: rest.itemOnClothSize.map(i => ({
                          where: { id: i.id ? i.id : 0 },
                          update: {
                              clothSizeId: i.clothSizeId,
                              isDeleted: i.isDeleted ? i.isDeleted : false,
                          },
                          create: { clothSizeId: i.clothSizeId },
                      })),
                  }
                : undefined,
            itemOnShoeSize: rest.itemOnShoeSize
                ? {
                      upsert: rest.itemOnShoeSize.map(i => ({
                          where: { id: i.id ? i.id : 0 },
                          update: {
                              shoeSizeId: i.shoeSizeId,
                              isDeleted: i.isDeleted ? i.isDeleted : false,
                          },
                          create: { shoeSizeId: i.shoeSizeId },
                      })),
                  }
                : undefined,
            itemOnShoeHeight: rest.itemOnShoeHeight
                ? {
                      upsert: rest.itemOnShoeHeight.map(i => ({
                          where: { id: i.id ? i.id : 0 },
                          update: {
                              shoeHeightId: i.shoeHeightId,
                              isDeleted: i.isDeleted ? i.isDeleted : false,
                          },
                          create: { shoeHeightId: i.shoeHeightId },
                      })),
                  }
                : undefined,
            itemOnJewelryType: rest.itemOnJewelryType
                ? {
                      upsert: rest.itemOnJewelryType.map(i => ({
                          where: { id: i.id ? i.id : 0 },
                          update: {
                              jewelryTypeId: i.jewelryTypeId,
                              isDeleted: i.isDeleted ? i.isDeleted : false,
                          },
                          create: { jewelryTypeId: i.jewelryTypeId },
                      })),
                  }
                : undefined,
        },
    );

    if (data instanceof Error) {
        return res.status(500).json({ errors: data.message });
    }

    return OK(`Updated successfully`, req, res);
};
