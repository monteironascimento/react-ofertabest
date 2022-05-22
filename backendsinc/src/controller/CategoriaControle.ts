import { getRepository } from 'typeorm';
import { Categoria } from '../entity/Categoria';
import { Request, Response } from 'express';
import { isEmpty } from '../tools/Empty';


export const setCategoria = async (req: Request, res: Response) => {
    //PASSAR ID DE CONSULTA
    const objList: any[] = req.body;
    const objRetorno: any[] =[];

    for (const key in objList) {
       
        let objCategoria:any = (await getRepository(Categoria).find({ idCategoriaOrigem : objList[key].idCategoriaOrigem}))[0];
        if(isEmpty(objCategoria)){
            await getRepository(Categoria).insert({ 
                descricao: objList[key].descricao,
                idCategoriaOrigem: objList[key].idCategoriaOrigem ,
            });        
        }else{
            await getRepository(Categoria).update(objCategoria.uidCategoria, { 
                descricao: objList[key].descricao,
                idCategoriaOrigem: objList[key].idCategoriaOrigem ,
            });
        }

        objCategoria = (await getRepository(Categoria).find({ idCategoriaOrigem : objList[key].idCategoriaOrigem}))[0];    
        if(!isEmpty(objCategoria)){
            objRetorno.push({ 
                idCategoria: objList[key].idCategoriaOrigem,
                url: `http://ofertabest.com/categoria/${objList[key].descricao}`,
                uidCategoria: objCategoria.uidCategoria,
                situacao: objList[key].situacao,
                hascodeorigem: objList[key].hascodeorigem,
                idPlataformaContaProcessado: objList[key].idPlataformaContaProcessado,
            })
        }
    }

    return res.status(200).json(objRetorno);
} 
