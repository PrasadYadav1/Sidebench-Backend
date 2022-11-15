/* eslint-disable import/first */
const getAdminMock = jest.fn();
const updateAdminMock = jest.fn();

import request from 'supertest';
import app from '../../app';
import generateToken from '../../utils/auth';

jest.mock('../../db/queries', () => ({
    getAdmin: getAdminMock,
    updateAdmin: updateAdminMock,
}));

let accessToken: string;

describe('Deactivate Admin', () => {
    describe('Deactivate Admin', () => {
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
            const result = await request(app).put('/admins/deactivateAdmin');
            expect(result.status).toBe(401);
        });
        it('Should return 401 for no auth token', async () => {
            const result = await request(app).put('/admins/deactivate-admin');
            expect(result.status).toBe(401);
        });
        it('Should return 400 when no req body sent', async () => {
            const result = await request(app)
                .put('/admins/deactivate-admin')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);

            expect(result.status).toBe(400);
        });
        it('Should return 403 when admin has no permission', async () => {
            const accessToken1 = generateToken(1, '', 'Admin');

            const result = await request(app)
                .put('/admins/deactivate-admin')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken1}`)
                .send({ id: 2 });

            expect(result.status).toBe(403);
        });
        it('Should return 404 when admin with the given id is not found', async () => {
            getAdminMock.mockImplementationOnce(() => Promise.resolve(null));

            const result = await request(app)
                .put('/admins/deactivate-admin')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ id: 2 });

            expect(result.status).toBe(404);
        });
        it('Should return 500 when there is an error in finding admin', async () => {
            getAdminMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .put('/admins/deactivate-admin')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ id: 2 });

            expect(result.status).toBe(500);
        });

        it('Should return 500 there is an error in updating', async () => {
            getAdminMock.mockImplementationOnce(() =>
                Promise.resolve({ id: 1, role: { name: 'Admin' } }),
            );

            updateAdminMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .put('/admins/deactivate-admin')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ id: 2 });

            expect(result.status).toBe(500);
        });

        it('Should return 200 ', async () => {
            getAdminMock.mockImplementationOnce(() =>
                Promise.resolve({ id: 1, role: { name: 'Admin' } }),
            );

            updateAdminMock.mockImplementationOnce(() => Promise.resolve({ id: 2 }));

            const result = await request(app)
                .put('/admins/deactivate-admin')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ id: 2 });

            expect(result.status).toBe(200);
        });
    });
});
