import { getConnection, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { generateCode, Oferta  } from '../entity/Oferta';
import { Loja } from '../entity/Loja';
import { Categoria } from '../entity/Categoria';
import { TipoInformacaoEnum } from '../enum/TipoInformacaoEnum';
import { isEmpty } from '../tools/Empty';

export const setOferta = async (req: Request, res: Response) => {
    //PASSAR ID DE CONSULTA
    const objList: any[] = req.body;
    const objRetorno: any[] =[];
    //SALVAR DATA DE INICIO DO SINC
    for (const key in objList) {
        try {
            
            const sql = `select * from oferta f	
                            where f.origem = ${objList[key].origem} 
                                    and f."categoriaUidCategoria" = '${objList[key].idCategoriaOrigem}' 
                                    and f."lojaUidLoja" = '${objList[key].idLojaOrigem}'
                                    and ${objList[key].origem === TipoInformacaoEnum.OFERTA ? `f."idOfertaOrigem" = '${objList[key].idOrigem}'` : `f."idCuponOrigem" = '${objList[key].idOrigem}'`}  
                        `
            
            let objOferta = await getConnection().query(sql);
            
            if(isEmpty(objOferta)){
                await getRepository(Oferta).insert(await getOferta(objList[key], null));        
            }else{
                objOferta = objOferta[0];
                await getRepository(Oferta).update(objOferta.uidOferta, await getOferta(objList[key], objOferta));
            }

            objOferta = await getConnection().query(sql);
            objOferta = objOferta[0];

            if(!isEmpty(objOferta)){
                objRetorno.push(setOfertaObj( objOferta, objList[key]))
            }
        } catch (error) {
           // console.log(error)        
        }
    
    }

    


    //DELETAR LOJAS QUE A DATA DE UPDATE E INFERIR AO INICIO DESSE PROCESSO
    return res.status(200).json(objRetorno);
} 

async function getOferta(obj: any, objOferta: any){

    //let objLoja:any = (await getRepository(Loja).find({ idLojaOrigem : obj.idLojaOrigem}))[0];
    //let objCategoria:any = (await getRepository(Categoria).find({ idCategoriaOrigem : obj.idCategoriaOrigem}))[0];

    let objLoja:Loja = await getRepository(Loja).findOne(obj.idLojaOrigem);
    let objCategoria: Categoria = await getRepository(Categoria).findOne(obj.idCategoriaOrigem);
    obj.loja =  objLoja
    obj.categoria = objCategoria
    let short = generateCode();

    if(!isEmpty(objOferta)){
        short = objOferta.linkshort
    }

    return { 
        origem: obj.origem,
        idOfertaOrigem: (obj.origem == TipoInformacaoEnum.OFERTA ? obj.idOrigem : null),
        idCuponOrigem: (obj.origem == TipoInformacaoEnum.CUPONS ? obj.idOrigem : null),
        loja: objLoja,
        categoria: objCategoria,
        nome: obj.nome,
        descricao: obj.descricao,
        link: obj.link,// `${(obj.nome)}-${short}`,
        linkshort: short,
        thumbnail: obj.thumbnail,
        preco: obj.preco,
        precoForm: obj.precoForm,
        expirado: false,
        dtInicio : obj.dtInicio, 
        dtFim : obj.dtFim,
        dsCupon: obj.dsCupon,
        grauOferta: 0,
    }
}

function setOfertaObj(objOferta: any, objOrigem: any){
    return { 
        
        idOrigem: objOrigem.idOrigem,
        idDestino: objOferta.uidOferta,
        url: `http://ofertabest.com/promo/${objOferta.linkshort}`,
        linkshort: `http://ofertabest.com/lk/${objOferta.linkshort}`,
        situacao: objOrigem.situacao,
        hascodeorigem: objOrigem.hasCode,
        idPlataformaContaProcessado: objOrigem.idPlataformaContaProcessado,
        thumbnail: objOferta.thumbnail,
        idloja: objOrigem.idloja,
        idcategoria: objOrigem.idcategoria,

    }
}