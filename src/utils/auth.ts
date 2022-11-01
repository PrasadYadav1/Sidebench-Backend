import { sign } from 'jsonwebtoken';
import { getTokenSecret } from '../config';

const generateToken = (
    id: number,
    email: string,
    role?: string,
    employerId?: number,
    expiresIn?: string | number,
): string =>
    sign(
        { userId: id, email, role, employerId },
        getTokenSecret() ?? '',
        expiresIn ? { expiresIn } : undefined,
    );

export default generateToken;
