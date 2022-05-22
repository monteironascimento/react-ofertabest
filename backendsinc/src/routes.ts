import { Router, Request, Response } from 'express';
import { setLoja } from './controller/LojaControle';
import { setCategoria } from './controller/CategoriaControle';
import { setOferta } from './controller/OfertaControle';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({status: process.env.NODE_ENV})
})

routes.post('/loja', setLoja )
routes.post('/categoria', setCategoria)
routes.post('/oferta', setOferta)

export default routes;