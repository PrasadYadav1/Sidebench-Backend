/* eslint-disable import/first */
const getItemMock = jest.fn();
const updateItemMock = jest.fn();

import request from 'supertest';
import app from '../../app';
import generateToken from '../../utils/auth';

jest.mock('../../db/queries', () => ({
    getItem: getItemMock,
    updateItem: updateItemMock,
}));

let accessToken: string;

const data = {
    id: 1,
    url: 'http://test.com',
    imageUrl: 'http://test/one.jpg',
    name: 'Test',
    brand: 'T',
    currencyId: 1,
    price: 123,
    description: 'Moony',
    itemTypeId: 1,
    itemSubTypes: [
        {
            itemSubTypeId: 1,
        },
        {
            id: 1,
            itemSubTypeId: 1,
            isDeleted: true,
        },
    ],
    itemOnAttireTypes: [
        {
            attireTypeId: 1,
        },
        {
            id: 1,
            attireTypeId: 1,
            isDeleted: true,
        },
    ],
    itemOnWearTypes: [
        {
            wearTypeId: 1,
        },
        {
            id: 1,
            wearTypeId: 1,
            isDeleted: true,
        },
    ],
    itemOnSeasons: [
        {
            seasonId: 1,
        },
        {
            id: 1,
            seasonId: 1,
            isDeleted: true,
        },
    ],
    itemOnColors: [
        {
            colorId: 1,
        },
        {
            id: 1,
            colorId: 1,
            isDeleted: true,
        },
    ],
    itemOnFit: [
        {
            fitId: 1,
        },
        {
            id: 1,
            fitId: 1,
            isDeleted: true,
        },
    ],
    itemOnWaistLocation: [
        {
            waistLocationId: 1,
        },
        {
            id: 1,
            waistLocationId: 1,
            isDeleted: true,
        },
    ],
    itemOnKeyword: [
        {
            keywordId: 1,
        },
        { id: 1, keywordId: 1, isDeleted: true },
    ],
    itemOnClothSize: [
        {
            clothSizeId: 1,
        },
        { id: 1, clothSizeId: 1, isDeleted: true },
    ],
    itemOnShoeSize: [
        {
            shoeSizeId: 1,
        },
        { id: 1, shoeSizeId: 1, isDeleted: true },
    ],
    itemOnShoeHeight: [
        {
            shoeHeightId: 1,
        },
        { id: 1, shoeHeightId: 1, isDeleted: true },
    ],
    itemOnJewelryType: [
        {
            jewelryTypeId: 1,
        },
        { id: 1, jewelryTypeId: 1, isDeleted: true },
    ],
};

describe('Edit  Item', () => {
    describe('Edit Item  tests', () => {
        beforeAll(() => {
            accessToken = generateToken(1, '', 'Super Admin');
        });
        beforeEach(() => {
            jest.resetAllMocks();
        });
        afterAll(() => {
            jest.clearAllMocks();
        });
        it('Should return 401 for wrong url', async () => {
            const result = await request(app).put('/admins/items');
            expect(result.status).toBe(401);
        });
        it('Should return 401 for no auth token', async () => {
            const result = await request(app).put('/admins/items');
            expect(result.status).toBe(401);
        });
        it('Should return 400 when no req body sent', async () => {
            const result = await request(app)
                .put('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);

            expect(result.status).toBe(400);
        });
        it('Should return 404 when admin with the given id is not found', async () => {
            getItemMock.mockImplementationOnce(() => Promise.resolve(null));

            const result = await request(app)
                .put('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ id: 1 });

            expect(result.status).toBe(404);
        });
        it('Should return 500 when there is an error in finding admin', async () => {
            getItemMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .put('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ id: 1 });

            expect(result.status).toBe(500);
        });
        it('Should return 500 there is an error in updating', async () => {
            getItemMock.mockImplementationOnce(() => Promise.resolve({ id: 1 }));

            updateItemMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .put('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ id: 1 });

            expect(result.status).toBe(500);
        });

        it('Should return 200 ', async () => {
            getItemMock.mockImplementationOnce(() => Promise.resolve({ id: 1 }));

            const result = await request(app)
                .put('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send(data);

            expect(result.status).toBe(200);
        });
        it('Should return 200 ', async () => {
            getItemMock.mockImplementationOnce(() => Promise.resolve({ id: 1 }));

            updateItemMock.mockImplementationOnce(() => Promise.resolve({ id: 1 }));

            const result = await request(app)
                .put('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ id: 2 });

            expect(result.status).toBe(200);
        });
    });
});
