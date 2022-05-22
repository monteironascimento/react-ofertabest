import { Request, Response } from 'express';
import { isEmpty } from '../../tools/Empty';
import { getLojasBase } from '../../controller/LojaControle';
import { getCache, setCache } from '../../controller/CacheController';



export const getLojas = async (req: Request, res: Response) => {

    const page: any             = req.query.page 

    const keyCache = `KEY_LOJASPAGE_PAGE${page}`;

    let lojas = null //await getCache(keyCache) 
    
    if(isEmpty(lojas)){
        lojas = await getLojasBase(page)
        setCache(keyCache, lojas , 60 * 60 * 24);
    }

    return res.status(200).json(lojas);
} 



