import { Router } from 'express';
import cors from 'cors';
import { login } from '../handlers';

export const adminRoutes: Router = Router();

adminRoutes.post('/login', cors(), login);
