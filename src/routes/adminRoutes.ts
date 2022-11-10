import { Router } from 'express';
import cors from 'cors';
import { deactivateAdmin, login } from '../handlers';

export const adminRoutes: Router = Router();

adminRoutes.post('/login', cors(), login);

adminRoutes.put('/deactivate-admin', deactivateAdmin);
