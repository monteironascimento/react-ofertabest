import { Request, Response } from 'express';
import { isEmpty } from '../../tools/Empty';
import { getOfertaDestaque, getOfertaLink, getOfertaRecentes, getOfertaRecentesCategoria, getOfertaRecentesLoja, getOfertaSearch, getOfertaShort, getOfertaUid, setIncrementOferta } from '../../controller/OfertaControle';
import { getCache, setCache } from '../../controller/CacheController';

export const getDestaques = async (req: Request, res: Response) => {

    const page: any        = req.query.page 
    const tipoDado: any    = req.query.tipo
    const reprocessar: any    = req.query.reprocessar

    const keyCache = `KEY_DESTAQUE_PAGE_${page}_${tipoDado}`;
        
    if(isEmpty(page)){
        return res.status(401).json({status: `Número de pagina é obrigatorio informar!`});
    }

    let destaques = await getCache(keyCache)    

    if(isEmpty(destaques) || reprocessar){
        destaques = await getOfertaDestaque(page, (isEmpty(tipoDado) == null ? null : tipoDado))
        setCache(keyCache, destaques, null);
    }

    return res.status(200).json(destaques);
} 

export const getRecentes = async (req: Request, res: Response) => {

    const page: any                 = req.query.page 
    const tipoInformacao: any       = req.query.tipoInformacao 
    const reprocessar: any          = req.query.reprocessar

    const keyCache = `KEY_RECENTES_PAGE_${page}_${tipoInformacao}`;

    if(isEmpty(page)){
        return res.status(401).json({status: `Número de pagina é obrigatorio informar!`});
    }

    let destaques: any = await getCache(keyCache)

    if(isEmpty(destaques) || reprocessar){

        destaques = await getOfertaRecentes(page, tipoInformacao) //
        setCache(keyCache, destaques, null)
        
    }
    
    return res.status(200).json(destaques);
} 

export const getDetail = async (req: Request, res: Response) => {

    const uidOferta: any            = req.query.short
    const keyCache                  = `KEY_OFERTA_UID_${uidOferta}`

    if(isEmpty(uidOferta)){
        return res.status(401).json({status: `Id Oferta é obrigatorio informar!`});
    }
        
    let destaques: any = await getCache(keyCache)
    if(isEmpty(destaques)){
        try {
            destaques = await getOfertaUid(uidOferta)
            setCache(keyCache, destaques, 172800);
        } catch (error) {
            return res.status(200).json([]);        
        }
    }

    return res.status(200).json(destaques);
} 

export const getLink = async (req: Request, res: Response) => {

    const shortlink: any            = req.query.short
    const keyCache                  = `KEY_SHORT_${shortlink}`

    if(isEmpty(shortlink)){
        return res.status(401).json({status: `Url Shorlink é obrigatorio informar!`});
    }
     
    let destaques = getCache(keyCache);
    if(isEmpty(destaques)){
        try {
            
            destaques = await getOfertaLink(shortlink)
            setCache(keyCache, destaques, 172800);
        } catch (error) {
            return res.status(200).json([]);        
        }
    }
    return res.status(200).json(destaques);
} 

export const getShortLink = async (req: Request, res: Response) => {

    const shortlink: any            = req.query.linkshort
    const keyCache                  = `KEY_SHORT${shortlink}`

    if(isEmpty(shortlink)){
        return res.status(401).json({status: `Url Shorlink é obrigatorio informar!`});
    }

    let destaques = await getCache(keyCache)
    if(isEmpty(destaques)){
        try{
            destaques = await getOfertaShort(shortlink)
            setCache(keyCache, destaques, 172800);
        } catch (error) {
            return res.status(200).json([]);        
        }
    }
2
    return res.status(200).json(destaques);
} 

export const getSearch = async (req: Request, res: Response) => {

    const page: any             = req.query.page 
    const search: any           = req.query.filtro 
    const tipoDado: any         = req.query.tipo

    const keyCache = `KEY_SEARCH${search}_PAGE${page}_${tipoDado}`
    
    if(isEmpty(page)){
        return res.status(401).json({status: `Pagina é obrigatorio informar!`});
    }

    if(isEmpty(search)){
        return res.status(401).json({status: `Filtro da consulta é obrigatorio informar!`});
    }
        
    let destaques = await getCache(keyCache);
    if(isEmpty(destaques)){
        destaques = await getOfertaSearch(page, search, tipoDado); 
        setCache(keyCache, destaques, 100)
    }

    return res.status(200).json(destaques);
} 


export const getRecentesCategoria = async (req: Request, res: Response) => {

    const page: any             = req.query.page 
    const search: any           = req.query.filtro 
    const tipoInformacao: any   = req.query.tipoInformacao 
    const searchDescricao: any   = req.query.filtroDescricao 
    
    const keyCache = `KEY_RECENTESCAT_PAGE${page}_${search}_${tipoInformacao}_${searchDescricao}`

    if(isEmpty(page)){
        return res.status(401).json({status: `Número de pagina é obrigatorio informar!`});
    }

    let destaques = await getCache(keyCache);
    if(isEmpty(destaques)){
        try{
            destaques = await getOfertaRecentesCategoria(page, tipoInformacao, search, searchDescricao) //
            setCache(keyCache, destaques, 100)
        }catch(err){
            return res.status(200).json([]);
        }
    }
    return res.status(200).json(destaques);
} 

export const getRecentesLoja = async (req: Request, res: Response) => {

    const page: any                 = req.query.page 
    const search: any               = req.query.filtro 
    const tipoInformacao: any       = req.query.tipoInformacao 
    const searchDescricao: any   = req.query.filtroDescricao 
    
    const keyCache = `KEY_RECENTESLOJA_PAGE${page}_${search}_${tipoInformacao}_${searchDescricao}`;

    if(isEmpty(page)){
        return res.status(401).json({status: `Número de pagina é obrigatorio informar!`});
    }
     
    let destaques = await getCache(keyCache);
    if(isEmpty(destaques)){
        destaques = await getOfertaRecentesLoja(page, tipoInformacao, search, searchDescricao) //
        setCache(keyCache, destaques, 100)
    }
    return res.status(200).json(destaques);
} 


export const setIncrement = async (req: Request, res: Response) => {

    const uid: any                 = req.query.uidOferta 
    const quantidade: any               = req.query.quantidade 
     
    setIncrementOferta(quantidade, uid) 
    return res.status(200).json("OK");
} 


