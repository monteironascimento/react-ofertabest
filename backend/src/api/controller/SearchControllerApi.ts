import { Request, Response } from 'express';
import { setSearchLog } from '../../controller/SearchController';

export const setSearch = async (req: Request, res: Response) => {
    const search: any             = req.query.search 
    setSearchLog(search)
    return res.status(200).json("OK");
} 


