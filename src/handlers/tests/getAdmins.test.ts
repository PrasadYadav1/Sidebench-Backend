/* eslint-disable import/first */
const getAdminsMock = jest.fn();
const getAdminsCountMock = jest.fn();

import request from 'supertest';
import app from '../../app';
import generateToken from '../../utils/auth';

jest.mock('../../db/queries', () => ({
    getAdmins: getAdminsMock,
    getAdminsCount: getAdminsCountMock,
}));

const adminsData = [
    {
        id: 6,
        email: 'email1',
        firstname: 'f1',
        lastname: 'l1',
        roleId: 2,
        statusId: 3,
        lastActive: '2022-11-11T06:30:01.671Z',
        role: {
            name: 'Admin',
        },
        status: {
            name: 'Deactivated',
        },
    },
    {
        id: 8,
        email: 'email2',
        firstname: 'f2',
        lastname: 'l2',
        roleId: 2,
        statusId: 2,
        lastActive: '2022-11-11T06:30:01.671Z',
        role: {
            name: 'Admin',
        },
        status: {
            name: 'Active',
        },
    },
];

let accessToken: string;

describe('Admins list', () => {
    describe('Admins list api', () => {
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
            const result = await request(app).get('/admins/getAdmins');
            expect(result.status).toBe(401);
        });
        it('Should return 401 for no auth token', async () => {
            const result = await request(app).get('/admins');
            expect(result.status).toBe(401);
        });
        it('Should return 400 when invalid query params are sent', async () => {
            const result = await request(app)
                .get('/admins?page=a')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);

            expect(result.status).toBe(400);
        });
        it('Should return 400 when from date is greater than to date', async () => {
            const result = await request(app)
                .get(
                    '/admins?activeFrom=2022-11-15T08:06:21.533Z&activeTo=2022-11-11T06:30:01.671Z',
                )
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);

            expect(result.status).toBe(400);
        });
        it('Should return 400 when only one of the dates selected', async () => {
            const result = await request(app)
                .get('/admins?activeFrom=2022-11-05T08:06:21.533Z')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);

            expect(result.status).toBe(400);
        });

        it('Should return 500 when there is an error in fetching admins', async () => {
            getAdminsMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .get('/admins')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(500);
        });

        it('Should return 500 when there is an error in fetching admins count', async () => {
            getAdminsCountMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .get('/admins')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(500);
        });

        it('Should return 200 when no query params applied', async () => {
            getAdminsMock.mockImplementationOnce(() => Promise.resolve(adminsData));
            getAdminsCountMock.mockImplementationOnce(() => Promise.resolve(2));

            const result = await request(app)
                .get('/admins')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(200);
            expect(result.body.data.count).toBe(2);
            expect(result.body.data.admins[0].id).toBe(6);
        });

        it('Should return 200 when pagination and search is applied', async () => {
            const result = await request(app)
                .get('/admins?search=l&page=1&pageSize=2')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(200);
        });

        it('Should return 200 when filters applied', async () => {
            const result = await request(app)
                .get(
                    '/admins?statusId=1&activeFrom=2022-11-05T08:06:21.533Z&activeTo=2022-11-11T06:30:01.671Z',
                )
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(200);
        });
    });
});
