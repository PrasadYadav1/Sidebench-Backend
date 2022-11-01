export const getPort = (): string | undefined => process.env.SERVER_PORT;
export const getTokenSecret = (): string | undefined => process.env.TOKEN_SECRET;
export const getDBUrl = (): string | undefined => process.env.DATABASE_URL;
export const getCors = (): string | undefined => process.env.CORS_ORIGINS;

export function checkEnvVariables(): boolean {
    let missingEnvVariables: Array<string> = [];
    if (!getPort()) {
        missingEnvVariables = ['SERVER_PORT'];
    }
    if (!getTokenSecret()) {
        missingEnvVariables = [...missingEnvVariables, 'TOKEN_SECRET'];
    }
    if (!getDBUrl()) {
        missingEnvVariables = [...missingEnvVariables, 'DATABASE_URL'];
    }
    if (!getCors()) {
        missingEnvVariables = [...missingEnvVariables, 'CORS_ORIGINS'];
    }
    if (missingEnvVariables.length > 0) {
        // Todo: replace console with logger
        // eslint-disable-next-line no-console
        console.log(`Following env variables missing: ${missingEnvVariables.join(',')}`);
        return false;
    }
    return true;
}
