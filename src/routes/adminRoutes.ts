import { Router } from 'express';
import cors from 'cors';
import {
    changePassword,
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

adminRoutes.delete('/:id', deleteAdmin);

adminRoutes.get('/lookbooks', getLookbooksData);

adminRoutes.put('/update-admin', editAdminsName);

adminRoutes.put('/change-password', changePassword);

adminRoutes.get('/master-data', getAllMasterData);
