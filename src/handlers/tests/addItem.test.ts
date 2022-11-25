/* eslint-disable import/first */
const getItemMaxIdMock = jest.fn();
const saveItemMock = jest.fn();

import request from 'supertest';
import app from '../../app';
import generateToken from '../../utils/auth';

jest.mock('../../db/queries', () => ({
    getItemMaxId: getItemMaxIdMock,
    saveItem: saveItemMock,
}));

let accessToken: string;

const data = {
    url: 'http://devlop.com',
    imageUrl: 'http://devolp.com/one.jpg',
    name: 'develop',
    brand: 'D',
    currencyId: 1,
    price: 200,
    description: 'Moony',
    itemTypeId: 1,
    itemSubTypes: [
        {
            itemSubTypeId: 1,
        },
    ],
    itemOnAttireTypes: [
        {
            attireTypeId: 1,
        },
    ],
    itemOnWearTypes: [
        {
            wearTypeId: 1,
        },
    ],
    itemOnSeasons: [
        {
            seasonId: 1,
        },
    ],
    itemOnColors: [
        {
            colorId: 1,
        },
    ],
    itemOnFit: [
        {
            fitId: 1,
        },
    ],
    itemOnWaistLocation: [
        {
            waistLocationId: 1,
        },
    ],
    itemOnKeyword: [
        {
            keywordId: 1,
        },
    ],
    itemOnClothSize: [
        {
            clothSizeId: 1,
        },
    ],
    itemOnShoeSize: [
        {
            shoeSizeId: 1,
        },
    ],
    itemOnShoeHeight: [
        {
            shoeHeightId: 1,
        },
    ],
    itemOnJewelryType: [
        {
            jewelryTypeId: 1,
        },
    ],
};

const data1 = {
    url: 'http://test.com',
    imageUrl: 'http://test/one.jpg',
    name: 'Test',
    brand: 'T',
    currencyId: 1,
    price: 123,
    description: 'Moony',
    itemTypeId: 1,
    itemOnAttireTypes: [
        {
            attireTypeId: 1,
        },
    ],
    itemOnWearTypes: [
        {
            wearTypeId: 1,
        },
    ],
    itemOnSeasons: [
        {
            seasonId: 1,
        },
    ],
    itemOnColors: [
        {
            colorId: 1,
        },
    ],
    itemOnFit: [
        {
            fitId: 1,
        },
    ],
    itemOnWaistLocation: [
        {
            waistLocationId: 1,
        },
    ],
    itemOnKeyword: [
        {
            keywordId: 1,
        },
    ],
};

describe('Add  Item', () => {
    describe('Add Item  tests', () => {
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
            const result = await request(app).post('/admins/items');
            expect(result.status).toBe(401);
        });
        it('Should return 401 for no auth token', async () => {
            const result = await request(app).post('/admins/items');
            expect(result.status).toBe(401);
        });
        it('Should return 400 when no req body sent', async () => {
            const result = await request(app)
                .post('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);

            expect(result.status).toBe(400);
        });

        it('Should return 500 when there is an error in finding admin', async () => {
            getItemMaxIdMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .post('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send(data);

            expect(result.status).toBe(500);
        });

        it('Should return 500 there is an error in updating', async () => {
            getItemMaxIdMock.mockImplementationOnce(() => Promise.resolve(1));

            saveItemMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .post('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send(data);

            expect(result.status).toBe(500);
        });

        it('Should return 200 ', async () => {
            getItemMaxIdMock.mockImplementationOnce(() => Promise.resolve(1));

            saveItemMock.mockImplementationOnce(() => Promise.resolve(data1));

            const result = await request(app)
                .post('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send(data1);

            expect(result.status).toBe(200);
        });

        it('Should return 200 ', async () => {
            getItemMaxIdMock.mockImplementationOnce(() => Promise.resolve(1));

            saveItemMock.mockImplementationOnce(() => Promise.resolve(data));

            const result = await request(app)
                .post('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send(data);

            expect(result.status).toBe(200);
        });
    });
});
