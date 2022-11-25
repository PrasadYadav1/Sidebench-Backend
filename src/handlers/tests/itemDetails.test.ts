/* eslint-disable import/first */
const getItemMock = jest.fn();

import request from 'supertest';
import app from '../../app';
import generateToken from '../../utils/auth';

jest.mock('../../db/queries', () => ({
    getItem: getItemMock,
}));

let accessToken: string;

describe('Item details', () => {
    describe('Item details api', () => {
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
            const result = await request(app).get('/admins/item/2');
            expect(result.status).toBe(401);
        });
        it('Should return 401 for no auth token', async () => {
            const result = await request(app).get('/admins/items/1');
            expect(result.status).toBe(401);
        });
        it('Should return 400 when invalid params are sent', async () => {
            const result = await request(app)
                .get('/admins/items/a')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(400);
        });

        it('Should return 500 when there is an error in fetching item details', async () => {
            getItemMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .get('/admins/items/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(500);
        });

        it('Should return 404 when item with the given id not found', async () => {
            getItemMock.mockImplementationOnce(() => Promise.resolve(null));
            const result = await request(app)
                .get('/admins/items/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(404);
        });

        it('Should return 200 ', async () => {
            getItemMock.mockImplementationOnce(() => Promise.resolve({ id: 1 }));

            const result = await request(app)
                .get('/admins/items/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(200);
        });
    });
});
