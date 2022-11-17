/* eslint-disable import/first */
const getLookbooksMock = jest.fn();
const getLookbooksCountMock = jest.fn();

import request from 'supertest';
import app from '../../app';
import generateToken from '../../utils/auth';

jest.mock('../../db/queries', () => ({
    getLookbooks: getLookbooksMock,
    getLookbooksCount: getLookbooksCountMock,
}));

const dbData = [
    {
        id: 3,
        customerId: 1,
        noOfLooks: 15,
        statusId: 1,
        occasion: 'birthday',
        dueBy: '2022-11-16T12:07:57.564Z',
        sentAt: null,
        status: {
            id: 1,
            name: 'To Do',
        },
    },
    {
        id: 1,
        customerId: 1,
        noOfLooks: 5,
        statusId: 1,
        occasion: 'birthday',
        dueBy: '2022-11-19T12:07:57.564Z',
        sentAt: null,
        status: {
            id: 1,
            name: 'To Do',
        },
    },
    {
        id: 2,
        customerId: 1,
        noOfLooks: 10,
        statusId: 2,
        occasion: 'Party',
        dueBy: '2022-11-17T12:07:57.564Z',
        sentAt: null,
        status: {
            id: 2,
            name: 'In Progress',
        },
    },
];

let accessToken: string;

describe('Lookbooks list', () => {
    describe('Lookbooks list api', () => {
        beforeAll(() => {
            accessToken = generateToken(1, '', 'Admin');
        });
        beforeEach(() => {
            jest.resetAllMocks();
        });
        afterAll(() => {
            jest.clearAllMocks();
        });
        it('Should return 401 for wrong url', async () => {
            const result = await request(app).get('/admins/lookbook');
            expect(result.status).toBe(401);
        });
        it('Should return 401 for no auth token', async () => {
            const result = await request(app).get('/admins/lookbooks');
            expect(result.status).toBe(401);
        });
        it('Should return 400 when invalid query params are sent', async () => {
            const result = await request(app)
                .get('/admins/lookbooks?noOfLooks=a')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);

            expect(result.status).toBe(400);
        });
        it('Should return 400 when from date is greater than to date', async () => {
            const result = await request(app)
                .get(
                    '/admins/lookbooks?fromDate=2022-11-15T08:06:21.533Z&toDate=2022-11-11T06:30:01.671Z',
                )
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);

            expect(result.status).toBe(400);
        });
        it('Should return 400 when only one of the dates selected', async () => {
            const result = await request(app)
                .get('/admins/lookbooks?fromDate=2022-11-05T08:06:21.533Z')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);

            expect(result.status).toBe(400);
        });

        it('Should return 500 when there is an error in fetching lookbooks', async () => {
            getLookbooksMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .get('/admins/lookbooks')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(500);
        });

        it('Should return 500 when there is an error in fetching lookbooks count', async () => {
            getLookbooksMock.mockImplementationOnce(() => Promise.resolve(dbData));

            getLookbooksCountMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .get('/admins/lookbooks')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(500);
        });

        it('Should return 200 when no query params applied', async () => {
            getLookbooksMock.mockImplementationOnce(() => Promise.resolve(dbData));
            getLookbooksCountMock.mockImplementationOnce(() => Promise.resolve(3));

            const result = await request(app)
                .get('/admins/lookbooks')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(200);
            expect(result.body.data.count).toBe(3);
        });

        it('Should return 200 when filters applied', async () => {
            getLookbooksMock.mockImplementationOnce(() => Promise.resolve(dbData));

            const result = await request(app)
                .get(
                    '/admins/lookbooks?noOfLooks=5&fromDate=2022-11-05T08:06:21.533Z&toDate=2022-11-11T06:30:01.671Z',
                )
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(200);
        });
    });
});
