import { getRepository } from 'typeorm';
import { Loja } from '../entity/Loja';
import { Request, Response } from 'express';
import { isEmpty } from '../tools/Empty';

export const setLoja = async (req: Request, res: Response) => {
    //PASSAR ID DE CONSULTA
    const objList: any[] = req.body;
    const objRetorno: any[] =[];
    //SALVAR DATA DE INICIO DO SINC

    for (const key in objList) {

        console.log(objList[key])
        if(!isEmpty(objList[key].idLojaOrigem)){
            
        }
        
        let objLoja:any = (await getRepository(Loja).find({ idLojaOrigem : objList[key].idLojaOrigem}))[0];
        if(isEmpty(objLoja)){
            await getRepository(Loja).insert({ 
                descricao: objList[key].descricao,
                thumbnail: objList[key].thumbnail,
                idLojaOrigem: objList[key].idLojaOrigem 
            });        
        }else{
            await getRepository(Loja).update(objLoja.uidLoja, { 
                descricao: objList[key].descricao,
                thumbnail: objList[key].thumbnail,
                idLojaOrigem: objList[key].idLojaOrigem 
            });
        }
        objLoja = (await getRepository(Loja).find({ idLojaOrigem : objList[key].idLojaOrigem}))[0];

        if(!isEmpty(objLoja)){
            objRetorno.push({ 
                idLoja: objLoja.idLojaOrigem,
                url: `http://ofertabest.com/loja/${objList[key].descricao}`,
                uidLoja: objLoja.uidLoja,
                situacao: objList[key].situacao,
                hascodeorigem: objList[key].hascodeorigem,
                idPlataformaContaProcessado: objList[key].idPlataformaContaProcessado,
                thumbnailDestino: objList[key].thumbnail
            })
        }
    }
    //DELETAR LOJAS QUE A DATA DE UPDATE E INFERIR AO INICIO DESSE PROCESSO
    return res.status(200).json(objRetorno);
} 