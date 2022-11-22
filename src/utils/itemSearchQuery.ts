import { Prisma } from '@prisma/client';

export const getItemElasticSearch = (search: string): Prisma.ItemWhereInput => {
    const query: Prisma.ItemWhereInput = {
        OR: [
            {
                name: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
            { itemType: { name: { contains: search, mode: 'insensitive' } } },
            {
                itemSubTypes: {
                    some: {
                        itemSubType: {
                            name: { contains: search, mode: 'insensitive' },
                        },
                    },
                },
            },
            {
                itemOnAttireTypes: {
                    some: {
                        attireType: {
                            name: { contains: search, mode: 'insensitive' },
                        },
                    },
                },
            },
            {
                itemOnWearTypes: {
                    some: {
                        wearType: {
                            name: { contains: search, mode: 'insensitive' },
                        },
                    },
                },
            },
            {
                itemOnSeasons: {
                    some: {
                        season: {
                            name: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                    },
                },
            },
            {
                itemOnColors: {
                    some: {
                        color: {
                            name: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                    },
                },
            },
            {
                itemOnFit: {
                    some: {
                        fit: {
                            name: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                    },
                },
            },
            {
                itemOnWaistLocation: {
                    some: {
                        waistLocation: {
                            name: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                    },
                },
            },
            {
                itemOnKeyword: {
                    some: {
                        keyword: {
                            name: { contains: search, mode: 'insensitive' },
                        },
                    },
                },
            },
            {
                itemOnClothSize: {
                    some: {
                        clothSize: {
                            OR: [
                                {
                                    name: { contains: search, mode: 'insensitive' },
                                },
                                {
                                    usa: { contains: search, mode: 'insensitive' },
                                },
                                {
                                    uk: { contains: search, mode: 'insensitive' },
                                },
                                {
                                    denim: { contains: search, mode: 'insensitive' },
                                },
                            ],
                        },
                    },
                },
            },
            {
                itemOnShoeSize: {
                    some: {
                        shoeSize: {
                            OR: [
                                {
                                    usa: { contains: search, mode: 'insensitive' },
                                },
                                {
                                    uk: { contains: search, mode: 'insensitive' },
                                },
                            ],
                        },
                    },
                },
            },
            {
                itemOnShoeHeight: {
                    some: {
                        shoeHeight: {
                            name: { contains: search, mode: 'insensitive' },
                        },
                    },
                },
            },
            {
                itemOnJewelryType: {
                    some: {
                        jewelryType: {
                            name: { contains: search, mode: 'insensitive' },
                        },
                    },
                },
            },
        ],
    };
    return query;
};
