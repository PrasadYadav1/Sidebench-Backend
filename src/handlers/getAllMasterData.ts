import { Request, RequestHandler, Response } from 'express';
import {  getMasterData } from '../db/queries';
import { OK } from '../utils';

export const getAllMasterData: RequestHandler = async (req: Request, res: Response) => {

    const data = await getMasterData()
    if (data instanceof Error) {
        return res.status(500).json({ errors: 'Something went wrong.' });
    }
  return OK( data , req, res);
};

export default getAllMasterData;