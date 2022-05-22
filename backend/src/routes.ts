import { Router, Request, Response } from 'express';
import {  getCategorias } from './api/controller/CategoriaControllerApi';
import { getLojas } from './api/controller/LojaControllerApi';
import { getDestaques, getDetail, getRecentes, getSearch, getShortLink, getRecentesCategoria, getRecentesLoja, setIncrement } from './api/controller/OfertaControllerApi';
import { getPostBackLomadee } from './api/controller/PostBackLomadee';
import { setSearch } from './api/controller/SearchControllerApi';
 
const routes = Router();

routes.get('/categorias', getCategorias )
routes.get('/lojas', getLojas)

routes.get('/search', getSearch) 
routes.get('/setSearch', setSearch) 

routes.get('/detail', getDetail )
routes.get('/lk', getShortLink ) //shortlinks

routes.get('/destaque', getDestaques)
routes.get('/recentes', getRecentes)
routes.get('/recentescat', getRecentesCategoria)
routes.get('/recentesloja', getRecentesLoja)
routes.get('/incrementOferta', setIncrement)


routes.get('/postBackLomadee', getPostBackLomadee )


export default routes;