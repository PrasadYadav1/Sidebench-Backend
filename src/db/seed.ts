import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await Promise.all(
        [
            { id: 1, name: 'Super Admin' },
            { id: 2, name: 'Admin' },
        ].map(r =>
            prisma.adminRole.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                },
            }),
        ),
    );
    await Promise.all(
        [
            { id: 1, name: 'Invited' },
            { id: 2, name: 'Active' },
            { id: 3, name: 'Deactivated' },
        ].map(r =>
            prisma.adminStatus.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                },
            }),
        ),
    );
    await Promise.all(
        [
            { id: 1, name: 'To Do' },
            { id: 2, name: 'In Progress' },
            { id: 3, name: 'Queued' },
            { id: 4, name: 'Completed' },
        ].map(r =>
            prisma.lookbookStatus.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                },
            }),
        ),
    );

    await Promise.all(
        [
            { id: 1, name: 'Top' },
            { id: 2, name: 'Dress' },
            { id: 3, name: 'Outerwear' },
            { id: 4, name: 'Pant' },
            { id: 5, name: 'Short' },
            { id: 6, name: 'Skirt' },
            { id: 7, name: 'Bag' },
            { id: 8, name: 'Shoe' },
            { id: 9, name: 'Accessory' },
        ].map(r =>
            prisma.itemType.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                },
            }),
        ),
    );

    await Promise.all(
        [
            { id: 1, itemTypeId:6, name: 'Mini' },
            { id: 2, itemTypeId:6, name: 'Midi' },
            { id: 3, itemTypeId:6, name: 'Maxi' },
            { id: 4, itemTypeId:8, name: 'Sandals' },
            { id: 5, itemTypeId:8, name: 'Flats' },
            { id: 6, itemTypeId:8, name: 'Sneaker' },
            { id: 7, itemTypeId:8, name: 'Boots' },
            { id: 8, itemTypeId:8, name: 'Mules' },
            { id: 9, itemTypeId:8, name: 'Pumps' },
            { id: 10, itemTypeId:8, name: 'Heeled Boots' },
            { id: 11, itemTypeId:9, name: 'Jewelry' },
            { id: 12, itemTypeId:9, name: 'Bags' },
            { id: 13, itemTypeId:9, name: 'Belts' },
            { id: 14, itemTypeId:9, name: 'Hair Accessories' },
            { id: 15, itemTypeId:9, name: 'Sunglasses' },
            { id: 16, itemTypeId:9, name: 'Hat' },
            { id: 17, itemTypeId:9, name: 'Scarves' },
        ].map(r =>
            prisma.itemSubType.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    itemTypeId:r.itemTypeId,
                    name: r.name,
                },
            }),
        ),
    );

    await Promise.all(
        [
            { id: 1, itemTypeId:8, name: 'Low' },
            { id: 2, itemTypeId:8, name: 'Mid' },
            { id: 3, itemTypeId:8, name: 'High' },
            { id: 4, itemTypeId:8, name: 'No Heel' },
        ].map(r =>
            prisma.shoeHeight.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    itemTypeId:r.itemTypeId,
                    name: r.name,
                },
            }),
        ),
    );

    await Promise.all(
        [
            { id: 1, itemSubTypeId:11, name: 'Necklace' },
            { id: 2, itemSubTypeId:11, name: 'Rings' },
            { id: 3, itemSubTypeId:11, name: 'Bracelet' },
        ].map(r =>
            prisma.jewelryType.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    itemSubTypeId:r.itemSubTypeId,
                    name: r.name,
                },
            }),
        ),
    );

    await Promise.all(
        [
            { id: 1, name: 'Everyday casual' },
            { id: 2, name: 'Upscale Casual' },
            { id: 3, name: 'Daytime Fancy' },
            { id: 4, name: 'Business Corporate' },
            { id: 5, name: 'Business Casua' },
            { id: 6, name: 'Night Out' },
            { id: 7, name: 'Evening / Cocktail' },
            { id: 8, name: 'Black Tie' },
            { id: 9, name: 'Activewear' },
            { id: 10, name: 'Beachwear' },
        ].map(r =>
            prisma.attireType.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                },
            }),
        ),
    );

    await Promise.all(
        [
            { id: 1, name: 'Spring' },
            { id: 2, name: 'Summer' },
            { id: 3, name: 'Fall' },
            { id: 4, name: 'Winter' },
        ].map(r =>
            prisma.season.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                },
            }),
        ),
    );

    await Promise.all(
        [
            { id: 1, name: 'New' },
            { id: 2, name: 'Vintage' },
            { id: 3, name: 'Second Hand' },
        ].map(r =>
            prisma.wearType.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                },
            }),
        ),
    );

    await Promise.all(
        [
            { id: 1, name: 'High' },
            { id: 2, name: 'Mid' },
            { id: 3, name: 'Low' },
        ].map(r =>
            prisma.waistLocation.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                },
            }),
        ),
    );

    await Promise.all(
        [
            { id: 1, name: 'Fitted' },
            { id: 2, name: 'Relaxed' },
            { id: 3, name: 'Oversized' },
        ].map(r =>
            prisma.fit.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                },
            }),
        ),
    );

    await Promise.all(
        [
            { id: 1, name: 'Blue' },
            { id: 2, name: 'Green' },
            { id: 3, name: 'Red' },
            { id: 4, name: 'Yellow' },
            { id: 5, name: 'Orange' },
            { id: 6, name: 'Purple ' },
            { id: 7, name: 'Pink' },
            { id: 8, name: 'White' },
            { id: 9, name: 'Black' },
            { id: 10, name: 'Gray' },
            { id: 11, name: 'Beige' },
            { id: 12, name: 'Silver' },
            { id: 13, name: 'Gold' },
            { id: 14, name: 'Sequins' },
        ].map(r =>
            prisma.color.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                },
            }),
        ),
    );

    await Promise.all(
        [
            { id: 1, name: 'Trendy' },
            { id: 2, name: 'Glam' },
            { id: 3, name: 'Sexy' },
            { id: 4, name: 'Grunge' },
            { id: 5, name: 'Preppy' },
            { id: 6, name: 'Edgy' },
            { id: 7, name: 'Sophisticated' },
            { id: 8, name: 'Romantic' },
            { id: 9, name: 'Sporty' },
            { id: 10, name: 'Classic/Refined' },
            { id: 11, name: 'Tomboy' },
            { id: 12, name: 'Futuristic' },
            { id: 13, name: 'Relaxed/Undone' },
            { id: 14, name: 'Bright/Artsy' },
            { id: 15, name: 'Muted' },
            { id: 16, name: 'Y2k' },
        ].map(r =>
            prisma.keyWord.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                },
            }),
        ),
    );

    await Promise.all(
        [
            { id: 1, name: 'XXS',usa: "0",uk:"2",au:"4",denim:"22" },
            { id: 2, name: 'XXS',usa: "0",uk:"4",au:"4",denim:"23" },
            { id: 3, name: 'XXS' ,usa: "0",uk:"4",au:"4",denim:"24"},
            { id: 4, name: 'XS',usa: "2",uk:"6",au:"6",denim:"25" },
            { id: 5, name: 'XS' ,usa: "2",uk:"6",au:"6",denim:"26"},
            { id: 6, name: 'S',usa: "4",uk:"7",au:"7",denim:"27" },
            { id: 7, name: 'S' ,usa: "4",uk:"7",au:"7",denim:"28"},
            { id: 8, name: 'S/M',usa: "6",uk:"10",au:"10",denim:"29" },
            { id: 9, name: 'M' ,usa: "8",uk:"12",au:"12",denim:"30"},
            { id: 10, name: 'M/L>' ,usa: "10",uk:"14",au:"14",denim:"31"},
            { id: 11, name: 'L>' ,usa: "12",uk:"16",au:"16",denim:"32"},
            { id: 12, name: 'L/XL>' ,usa: "14",uk:"16",au:"16",denim:"33"},
        ].map(r =>
            prisma.clothSize.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                    usa:r.usa,
                    uk:r.uk,
                    au:r.au,
                    denim:r.denim

                },
            }),
        ),
    );

    await Promise.all(
        [
            { id: 1,usa: "5",uk:"2.5" },
            { id: 2,usa: "5.5",uk:"3" },
            { id: 3,usa: "6",uk:"3.5" },
            { id: 4,usa: "6.5",uk:"4" },
            { id: 5,usa: "7",uk:"4.5" },
            { id: 6,usa: "7.5",uk:"5" },
            { id: 7,usa: "8",uk:"5.5" },
            { id: 8,usa: "8.5",uk:"6" },
            { id: 9,usa: "9",uk:"6.5" },
            { id: 10,usa: "9.5",uk:"7" },
            { id: 11,usa: "10",uk:"7.5" },
            { id: 12,usa: "10.5",uk:"8" },
            { id: 13,usa: "12",uk:"9.5" },
            { id: 14,usa: "13",uk:"10.5" },
            { id: 15,usa: "14",uk:"11.5" },
            { id: 16,usa: "15.5",uk:"13"}
        ].map(r =>
            prisma.shoeSize.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    usa:r.usa,
                    uk:r.uk,

                },
            }),
        ),
    );

}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
