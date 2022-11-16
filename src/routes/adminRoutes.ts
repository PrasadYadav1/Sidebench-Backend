import { Router } from 'express';
import cors from 'cors';
import { deactivateAdmin, deleteAdmin, getAdminsData, getLookbooksData, login } from '../handlers';

export const adminRoutes: Router = Router();

adminRoutes.post('/login', cors(), login);

adminRoutes.put('/deactivate-admin', deactivateAdmin);

adminRoutes.get('/', getAdminsData);

adminRoutes.delete('/delete-admin/:id', deleteAdmin);

adminRoutes.get('/lookbooks', getLookbooksData);
