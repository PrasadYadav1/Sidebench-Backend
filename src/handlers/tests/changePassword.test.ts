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

describe('Edit Admin', () => {
    describe('Edit Admin Names tests', () => {
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
            const result = await request(app).put('/admins/changePassword');
            expect(result.status).toBe(401);
        });
        it('Should return 401 for no auth token', async () => {
            const result = await request(app).put('/admins/change-password');
            expect(result.status).toBe(401);
        });
        it('Should return 400 when no req body sent', async () => {
            const result = await request(app)
                .put('/admins/change-password')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);

            expect(result.status).toBe(400);
        });
        it('Should return 400 when invalid req body sent', async () => {
            const result = await request(app)
                .put('/admins/change-password')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ password: 'Password@1', confirmPasswrd: 'Password@11' });

            expect(result.status).toBe(400);
        });

        it('Should return 404 when admin  not found', async () => {
            getAdminMock.mockImplementationOnce(() => Promise.resolve(null));

            const result = await request(app)
                .put('/admins/change-password')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ password: 'Password@1', confirmPasswrd: 'Password@1' });

            expect(result.status).toBe(404);
        });
        it('Should return 500 when there is an error in finding admin', async () => {
            getAdminMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .put('/admins/change-password')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ password: 'Password@1', confirmPasswrd: 'Password@1' });

            expect(result.status).toBe(500);
        });
        it('Should return 409 when same password is same as previous one', async () => {
            getAdminMock.mockImplementationOnce(() =>
                Promise.resolve({
                    id: 1,
                    email: 'email@a.com',
                    statusId: 1,
                    password: '$2b$10$bsATZKWd.ATdQbbu3.b6z.IXP3DjNyf4i0hX9YIj8HNeKX9a77Vc.',
                }),
            );

            const result = await request(app)
                .put('/admins/change-password')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ password: 'Password@1', confirmPasswrd: 'Password@1' });

            expect(result.status).toBe(409);
        });

        it('Should return 500 when there is an error in updating', async () => {
            getAdminMock.mockImplementationOnce(() =>
                Promise.resolve({
                    id: 1,
                    email: 'email@a.com',
                    statusId: 2,
                    password: '$2b$10$u99NeUcUOHREtz5p9J9YmO92g2yfuUaQod26tQVItJJJGdMHfnZtm',
                }),
            );

            updateAdminMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .put('/admins/change-password')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ password: 'Password@1', confirmPasswrd: 'Password@1' });

            expect(result.status).toBe(500);
        });

        it('Should return 200 ', async () => {
            getAdminMock.mockImplementationOnce(() =>
                Promise.resolve({
                    id: 1,
                    email: 'email@a.com',
                    statusId: 1,
                    password: '$2b$10$u99NeUcUOHREtz5p9J9YmO92g2yfuUaQod26tQVItJJJGdMHfnZtm',
                }),
            );

            updateAdminMock.mockImplementationOnce(() => Promise.resolve({ id: 1 }));

            const result = await request(app)
                .put('/admins/change-password')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`)
                .send({ password: 'Password@1', confirmPasswrd: 'Password@1' });

            expect(result.status).toBe(200);
        });
    });
});
