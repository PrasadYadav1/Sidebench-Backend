import { Router } from 'express';
import cors from 'cors';
import { deactivateAdmin, deleteAdmin, getAdminsData, login } from '../handlers';

export const adminRoutes: Router = Router();

adminRoutes.post('/login', cors(), login);

adminRoutes.put('/deactivate-admin', deactivateAdmin);

adminRoutes.get('/get-admins', getAdminsData);

adminRoutes.delete('/delete-admin/:id', deleteAdmin);
