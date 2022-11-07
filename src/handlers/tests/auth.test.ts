/* eslint-disable import/first */
const getAdminMock = jest.fn();

import request from 'supertest';
import { ZodIssue } from 'zod';
import app from '../../app';

jest.mock('../../db/queries', () => ({
    getAdmin: getAdminMock,
}));

describe('Auth Test', () => {
    describe('Admin login tests', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });
        afterAll(() => {
            jest.clearAllMocks();
        });
        it('Should return 401 for wrong url', async () => {
            const result = await request(app).get('/admin/logins');
            expect(result.status).toBe(401);
        });
        it('Should return 400 for empty body', async () => {
            const result = await request(app).post('/admin/login').send({});
            expect(result.status).toBe(400);
            expect(result.body.errors.length).toBe(2);
            expect(new Set(result.body.errors.map((e: ZodIssue) => e.path[0]))).toEqual(
                new Set(['email', 'password']),
            );
        });
        it('Should return 400 for wrong email', async () => {
            const result = await request(app)
                .post('/admin/login')
                .send({ password: 'bgfvhdhvhd', email: 'abcdef' });
            expect(result.status).toBe(400);
            expect(result.body.errors.length).toBe(1);
            expect(result.body.errors[0].path).toEqual(['email']);
            expect(result.body.errors[0].message).toBe('Not a valid email');
        });
        it('Should return 500 when there is an error', async () => {
            getAdminMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .post('/admin/login')
                .send({ password: 'bgfvhdhvhd', email: 'abcdef@abc.com' });
            expect(result.status).toBe(500);
        });

        it('Should return 404 when there is no user', async () => {
            getAdminMock.mockImplementationOnce(() => Promise.resolve(null));
            const result = await request(app)
                .post('/admin/login')
                .send({ password: 'bgfvhdhvhd', email: 'abcdef@abc.com' });
            expect(result.status).toBe(404);
            expect(result.body.errors).toBe(`User could not found.`);
        });

        it('Should return 401 with proper code and message when there is user but deactivated', async () => {
            getAdminMock.mockImplementationOnce(() =>
                Promise.resolve({
                    id: 199,
                    firstname: 'test',
                    lastname: 'test1',
                    password: 'fsdgsdgs',
                    status: {
                        name: 'Deactivated',
                        id: 1,
                    },
                }),
            );
            const result = await request(app)
                .post('/admin/login')
                .send({ password: 'bgfvhdhvhd', email: 'abcdef@abc.com' });
            expect(result.status).toBe(401);
            expect(result.body.errors.code).toBe(`account_disabled`);
            expect(result.body.errors.message).toBe(
                'Your account has been disabled. Please contact admin.',
            );
        });
        it('Should return 401 with proper code and message when credentials are wrong', async () => {
            getAdminMock.mockImplementationOnce(() =>
                Promise.resolve({
                    id: 199,
                    firstname: 'test',
                    lastname: 'test1',
                    password: '$2a$12$eBJepIdu4jkZAqip33E2g.zKdxGeFhjv72/tMfZ7/xTc7D684xc1S',
                    status: {
                        name: 'Active',
                    },
                    email: 'abcdef@abc.com',
                }),
            );
            const result = await request(app)
                .post('/admin/login')
                .send({ password: 'bgfvhdhvhd', email: 'abcdef@abc.com' });
            expect(result.status).toBe(401);
            expect(result.body.errors.code).toBe(`invalid_credentials`);
            expect(result.body.errors.message).toBe(
                'Could not log you in. Please check your email and password.',
            );
        });

        it('Should return 200 with user data when credentials are valid', async () => {
            const data = {
                id: 199,
                firstname: 'test',
                lastname: 'test1',
                password: '$2a$12$QVGpPwAMhZFd3zAnfooZu.S1Z8OUr0usDaL1dkwncHaipGsyCOyIu',
                status: {
                    name: 'Active',
                },
                email: 'abcdef@abc.com',
                role: {
                   name: 'admin'
                }
            };
            getAdminMock.mockImplementationOnce(() => Promise.resolve(data));
            const result = await request(app)
                .post('/admin/login')
                .send({ password: 'bgfvhdhvhd', email: 'abcdef@abc.com' });
            expect(result.status).toBe(200);
            expect(result.body.data.password).toBe(undefined);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...rest } = data;
            expect(Object.keys(result.body.data)).toEqual(
                Object.keys({ ...rest, token: '' }),
            );
        });

    });
});
