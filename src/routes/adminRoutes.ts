import { Router } from 'express';
import { login } from '../handlers';

export const adminRoutes: Router = Router();

adminRoutes.post('/login', login);
