import { number, string, TypeOf, z } from 'zod';

export const NumberType = number().or(string().regex(/^\d+$/).transform(Number));

export type NumberType = TypeOf<typeof NumberType>;

export const dateSchema = z.preprocess(arg => {
    if (typeof arg === 'string' || arg instanceof Date) {
        return new Date(arg);
    }
    return arg;
}, z.date());

export type DateSchema = z.infer<typeof dateSchema>;
