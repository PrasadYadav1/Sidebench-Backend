import { Request, Response } from 'express';

type HttpStatusCodes =
    | 'OK'
    | 'NOT_FOUND'
    | 'BAD_REQUEST'
    | 'CREATE'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'CONFLICT'
    | 'UNPROCESSABLE'
    | 'NO_CONTENT';
type HttpStatus = {
    readonly [code in HttpStatusCodes]: <T>(data: T, req: Request, res: Response) => Response;
};

// eslint-disable-next-line max-len
const httpStatusMethod: <T>(
    data: T,
    req: Request,
    res: Response,
    statusCode: number,
) => any = async (data, req, res, statusCode) => {
    // eslint-disable-next-line prefer-const
    let responseData: any = data;
    res.status(statusCode).send(responseData);
};

const httpStatus: HttpStatus = {
    OK: <T>(data: T, req: Request, res: Response) =>
        httpStatusMethod({ data, status: 'success' }, req, res, 200),
    NOT_FOUND: <T>(data: T, req: Request, res: Response) =>
        httpStatusMethod({ errors: data, status: 'failure' }, req, res, 404),
    BAD_REQUEST: <T>(data: T, req: Request, res: Response) =>
        httpStatusMethod({ errors: data, status: 'failure' }, req, res, 400),
    CONFLICT: <T>(data: T, req: Request, res: Response) =>
        httpStatusMethod({ errors: data, status: 'failure' }, req, res, 409),
    CREATE: <T>(data: T, req: Request, res: Response) =>
        httpStatusMethod({ data, status: 'success' }, req, res, 201),
    UNAUTHORIZED: <T>(data: T, req: Request, res: Response) =>
        httpStatusMethod({ errors: data, status: 'failure' }, req, res, 401),
    FORBIDDEN: <T>(data: T, req: Request, res: Response) =>
        httpStatusMethod({ errors: data, status: 'failure' }, req, res, 403),
    UNPROCESSABLE: <T>(data: T, req: Request, res: Response) =>
        httpStatusMethod({ data }, req, res, 422),
    NO_CONTENT: <T>(data: T, req: Request, res: Response) => httpStatusMethod({}, req, res, 204),
};

export = httpStatus;
