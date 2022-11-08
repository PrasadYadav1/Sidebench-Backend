import { Response } from 'express';

export {
    OK,
    NOT_FOUND,
    BAD_REQUEST,
    CREATE,
    FORBIDDEN,
    UNAUTHORIZED,
    CONFLICT,
    UNPROCESSABLE,
    NO_CONTENT,
} from './httpStatus';
export const INTERNAL_SERVER_ERROR = (
    res: Response,
    err?: string | Record<string, any>,
): Response =>
    res.status(500).json({ errors: err ?? 'Something went wrong. Please contact support.' });
export * as auth from './auth';
export * from './uploadImage';
export * from './enums';
