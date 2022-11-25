/* eslint-disable import/first */
const getAdminMock = jest.fn();
const updateAdminMock = jest.fn();

import request from 'supertest';
import app from '../../app';
import { generateResetToken } from '../../utils/auth';

jest.mock('../../db/queries', () => ({
    getAdmin: getAdminMock,
    updateAdmin: updateAdminMock,
}));

let resetToken: string;

describe('Reset Password', () => {
    describe('Reset Password', () => {
        beforeAll(() => {
            resetToken = generateResetToken('a@c.com');
        });
        beforeEach(() => {
            jest.resetAllMocks();
        });
        afterAll(() => {
            jest.clearAllMocks();
        });
        it('Should return 401 for wrong url', async () => {
            const result = await request(app).put('/admins/resetPassword');
            expect(result.status).toBe(401);
        });

        it('Should return 400 when no req body sent', async () => {
            const result = await request(app)
                .put('/admins/reset-password')
                .set('Content-Type', 'application/json');

            expect(result.status).toBe(400);
        });
        it('Should return 400 when required fields are not sent', async () => {
            const result = await request(app)
                .put('/admins/reset-password')
                .set('Content-Type', 'application/json')
                .send({ password: 'Password@1', confirmPassword: 'Password@1' });

            expect(result.status).toBe(400);
        });
        it('Should return 400 when passwords does not match', async () => {
            const result = await request(app)
                .put('/admins/reset-password')
                .set('Content-Type', 'application/json')
                .send({
                    password: 'Password@1',
                    confirmPassword: 'Password@11',
                    token: resetToken,
                });

            expect(result.status).toBe(400);
        });
        it('Should return 500 when invalid token sent', async () => {
            const result = await request(app)
                .put('/admins/reset-password')
                .set('Content-Type', 'application/json')
                .send({
                    password: 'Password@1',
                    confirmPassword: 'Password@1',
                    token: 'resetToken',
                });

            expect(result.status).toBe(500);
        });

        it('Should return 404 when admin  not found', async () => {
            getAdminMock.mockImplementationOnce(() => Promise.resolve(null));

            const result = await request(app)
                .put('/admins/reset-password')
                .set('Content-Type', 'application/json')
                .send({ password: 'Password@1', confirmPassword: 'Password@1', token: resetToken });

            expect(result.status).toBe(404);
        });
        it('Should return 500 when there is an error in finding admin', async () => {
            getAdminMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .put('/admins/reset-password')
                .set('Content-Type', 'application/json')
                .send({ password: 'Password@1', confirmPassword: 'Password@1', token: resetToken });

            expect(result.status).toBe(500);
        });

        it('Should return 500 when there is an error in updating', async () => {
            getAdminMock.mockImplementationOnce(() =>
                Promise.resolve({
                    id: 1,
                    email: 'a@c.com',
                }),
            );

            updateAdminMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .put('/admins/reset-password')
                .set('Content-Type', 'application/json')
                .send({ password: 'Password@1', confirmPassword: 'Password@1', token: resetToken });

            expect(result.status).toBe(500);
        });

        it('Should return 200 ', async () => {
            getAdminMock.mockImplementationOnce(() =>
                Promise.resolve({
                    id: 1,
                    email: 'a@c.com',
                }),
            );

            updateAdminMock.mockImplementationOnce(() => Promise.resolve({ id: 1 }));

            const result = await request(app)
                .put('/admins/reset-password')
                .set('Content-Type', 'application/json')
                .send({ password: 'Password@1', confirmPassword: 'Password@1', token: resetToken });

            expect(result.status).toBe(200);
        });
    });
});
