import { Router } from 'express';
import cors from 'cors';
import {
    changePassword,
    deactivateAdmin,
    deleteAdmin,
    editAdminsName,
    getAdminsData,
    getAllMasterData,
    getItemsData,
    getItemDetails,
    getLookbooksData,
    createItem,
    login,
    updateAdminPassword,
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

adminRoutes.get('/items', getItemsData);

adminRoutes.post('/items', createItem);

adminRoutes.get('/items/:id', getItemDetails);

adminRoutes.put('/reset-password', updateAdminPassword);
