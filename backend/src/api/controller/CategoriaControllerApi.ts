import { Request, Response } from 'express';
import { getCategoriasBase } from '../../controller/CategoriaControle';
import { isEmpty } from '../../tools/Empty';
import { getCache, setCache } from '../../controller/CacheController';

export const getCategorias = async (req: Request, res: Response) => {

    const page: any             = req.query.page 
    const keyCache = `KEY_CATEGORIAS_PAGE${page}`

    let categorias: any = await getCache(keyCache) 
    if(isEmpty(categorias)){
        categorias = await getCategoriasBase(page)
        setCache(keyCache, categorias, 60 * 60 * 24);
    }

    return res.status(200).json(categorias);
} 


