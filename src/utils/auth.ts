import { sign } from 'jsonwebtoken';
import { getTokenSecret } from '../config';

const generateToken = (
    id: number,
    email: string,
    role?: string,
    expiresIn?: string | number,
): string =>
    sign(
        { userId: id, email, role },
        getTokenSecret() ?? '',
        expiresIn ? { expiresIn } : undefined,
    );

export default generateToken;
