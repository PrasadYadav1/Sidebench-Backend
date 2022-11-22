/* eslint-disable import/first */
const getMasterDataMock = jest.fn();

import request from 'supertest';
import app from '../../app';
import generateToken from '../../utils/auth';

jest.mock('../../db/queries', () => ({
    getMasterData: getMasterDataMock,
}));

let accessToken: string;

describe('Master Data list', () => {
    describe('Master Data list api', () => {
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
            const result = await request(app).get('/admins/master-data');
            expect(result.status).toBe(401);
        });
        it('Should return 401 for no auth token', async () => {
            const result = await request(app).get('/admins/master-data');
            expect(result.status).toBe(401);
        });
        it('Should return 500 when there is an error in fetching master data', async () => {
            getMasterDataMock.mockImplementationOnce(() =>
                Promise.resolve(Error('Internal Server Error')),
            );
            const result = await request(app)
                .get('/admins/master-data')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(500);
        });
        it('Should return 200  in fetching master data', async () => {
            const result = await request(app)
                .get('/admins/master-data')
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${accessToken}`);
            expect(result.status).toBe(200);
        });
    });
});
