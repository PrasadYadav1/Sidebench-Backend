import 'dotenv/config';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { expressjwt as jwt } from 'express-jwt';
import multer from 'multer';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import { getCors, checkEnvVariables, getTokenSecret } from './config';
import { adminRoutes, publicUrls } from './routes';
import { UNAUTHORIZED } from './utils/httpStatus';

const addMiddleware: (app: Express) => Express = app => {
    // if required env variables not found logging message and exiting server

    if (!checkEnvVariables()) {
        process.exit(1);
    }
    const allowedOrigins = getCors();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(multer().single('imageFile'));
    if (allowedOrigins === '*') {
        app.use(cors());
    } else {
        cors({
            credentials: true,
            origin: (allowedOrigins || '').split(','),
        });
    }
    if (process.env.SHOW_API_DOCS === 'yes') {
        const swaggerDocument = YAML.load(`${__dirname}/docs/moony-admin-1.0.yaml`);
        app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    }
    app.use(
        jwt({ secret: getTokenSecret() || '', algorithms: ['HS256'] }).unless({
            path: publicUrls,
        }),
    );
    app.use('/admin', adminRoutes);
    app.get('/app/health', async (req: Request, res: Response) => {
        const healthCheck = {
            uptime: process.uptime(),
            responseTime: process.hrtime(),
            cpuUsage: process.cpuUsage(),
            timestamp: new Date(),
        };
        return res.status(200).json(healthCheck);
    });
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err) {
            // jwt will throw this error when token is not found or invalid
            if (err.name === 'UnauthorizedError') {
                return UNAUTHORIZED('Invalid token or token is expired', req, res);
            }
        }
        return next();
    });
    return app;
};
const startApp: () => Express = () => {
    const app: Express = express();
    addMiddleware(app);
    return app;
};

const app: Express = startApp();
export default app;
