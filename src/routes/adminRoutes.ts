import { Router } from 'express';
import { login } from '../handlers';
import cors from 'cors';

export const adminRoutes: Router = Router();

adminRoutes.post('/login', cors(), login);
