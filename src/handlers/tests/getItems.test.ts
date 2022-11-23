/* eslint-disable import/first */
const getItemsMock = jest.fn();
const getItemsCountMock = jest.fn();

import request from 'supertest';
import app from '../../app';
import generateToken from '../../utils/auth';

jest.mock('../../db/queries', () => ({
    getItems: getItemsMock,
    getItemsCount: getItemsCountMock,
}));

let accessToken: string;

describe('Items list', () => {
    describe('Items list api', () => {
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
            const result = await request(app).get('/admins/getItems');
            expect(result.status).toBe(401);
        });
        it('Should return 401 for no auth token', async () => {
            const result = await request(app).get('/admins/items');
            expect(result.status).toBe(401);
        });
        it('Should return 400 when invalid query params are sent', async () => {
            const result = await request(app)
                .get('/admins/items?page=a')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);

            expect(result.status).toBe(400);
        });

        it('Should return 500 when there is an error in fetching items', async () => {
            getItemsMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .get('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(500);
        });

        it('Should return 500 when there is an error in fetching items count', async () => {
            getItemsCountMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .get('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(500);
        });

        it('Should return 200 when no query params applied', async () => {
            const result = await request(app)
                .get('/admins/items')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            getItemsMock.mockImplementationOnce(() => Promise.resolve(result.body.data.rows));
            getItemsCountMock.mockImplementationOnce(() => Promise.resolve(2));
            expect(result.status).toBe(200);
        });

        it('Should return 200 when pagination and search is applied', async () => {
            const result = await request(app)
                .get('/admins/items?search=l&page=1&pageSize=2')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(200);
        });

        it('Should return 200 when filters applied', async () => {
            const result = await request(app)
                .get(
                    '/admins/items?itemTypeId=1&itemSubTypeId=1&attireTypeId=1&wearTypeId=1&seasonId=1&colorId=1&fitId=1&waistLocationId=1&keywordId=1&clothSizeId=1&shoeSizeId=1&shoeHeightId=1&jewelryTypeId=1',
                )
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(200);
        });

        it('Should return 200 when filters applied', async () => {
            const result = await request(app)
                .get(
                    '/admins/items?itemSubTypeId=1&itemSubTypeId=2&attireTypeId=1&attireTypeId=2&wearTypeId=1&wearTypeId=2&seasonId=1&seasonId=2&colorId=1&colorId=2&fitId=1&fitId=2&waistLocationId=1&waistLocationId=2&keywordId=1&keywordId=2&clothSizeId=1&clothSizeId=2&shoeSizeId=1&shoeSizeId=2&shoeHeightId=1&shoeHeightId=2&jewelryTypeId=1&jewelryTypeId=2',
                )
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(200);
        });
    });
});
