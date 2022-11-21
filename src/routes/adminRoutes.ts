import { Router } from 'express';
import cors from 'cors';
import {
    deactivateAdmin,
    deleteAdmin,
    editAdminsName,
    getAdminsData,
    getAllMasterData,
    getLookbooksData,
    login,
} from '../handlers';

export const adminRoutes: Router = Router();

adminRoutes.post('/login', cors(), login);

adminRoutes.put('/deactivate-admin', deactivateAdmin);

adminRoutes.get('/', getAdminsData);

adminRoutes.delete('/delete-admin/:id', deleteAdmin);

adminRoutes.get('/lookbooks', getLookbooksData);

adminRoutes.put('/update-admin', editAdminsName);

adminRoutes.get('/master-data', getAllMasterData);
