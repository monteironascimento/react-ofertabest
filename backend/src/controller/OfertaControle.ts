import axios from "axios";
import { getConnection, getRepository } from "typeorm";
import { endPointDesEnum, endPointProdEnum } from "../enum/EndPointEnum";
import { TipoInformacaoEnum } from "../enum/TipoInformacaoEnum";
import { isEmpty } from "../tools/Empty";
import { getCache, setCache } from '../controller/CacheController';
import { Oferta } from "../entity/Oferta";
const endPoint = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? endPointProdEnum : endPointDesEnum)


const sqlAtributes = `
            f."uidOferta", 
            f."nome", 
            f."descricao", 
            f."link", 
            f."linkshort", 
            f."thumbnail", 
            f."preco", 
            f."precoForm",
            f."expirado", 
            f."created_at", 
            f."dtFim", 
            f."dsCupon", 
            f."grauOferta", 
            l."uidLoja", 
            l."descricao" as descricaoloja, 
            l."thumbnail" as thumbnailloja, 
            c."uidCategoria", 
            c."descricao" as descricaoCategoria 
`
let ofert_per_default = 50;
let ofert_per_page = 10;

export async function getOfertasCategoriaBase(uidCategoria: string, page: number, tipo : TipoInformacaoEnum){

    if(page === 1){
        ofert_per_page = 4
    }else{
        ofert_per_page = ofert_per_default
    }

    let page_use = (ofert_per_page * page) - ofert_per_page;

    const sql = `select 
                    ${sqlAtributes} 
                from oferta f
                    inner join loja l on (l."uidLoja" = f."lojaUidLoja")
                    inner join categoria c on (c."uidCategoria" = f."categoriaUidCategoria")
                where f.origem = ${tipo} 
                    and f.expirado = 'F' 
                    and f.categoriaUidCategoria = ${uidCategoria} 
                order by f."fixado", f.created_at desc
                limit ${ofert_per_page} offset ${page_use}`;

    const filter = await getConnection().query(sql);
    return filter;

}

export async function getOfertasLojaBase(uidLoja: string, page: number, tipo : TipoInformacaoEnum){

   if(page === 1){
        ofert_per_page = 4
    }else{
        ofert_per_page = ofert_per_default
    }

    let page_use = (ofert_per_page * page) - ofert_per_page;

    const sql = `select 
                    ${sqlAtributes} 
                from oferta f

                    inner join loja l on (l."uidLoja" = f."lojaUidLoja")
                    inner join categoria c on (c."uidCategoria" = f."categoriaUidCategoria")
                where f.origem = ${tipo} 
                    and f.expirado = 'F' 
                    and f.lojaUidLoja = ${uidLoja} 
                order by f."fixado", f.created_at desc
                limit ${ofert_per_page} offset ${page_use}`;

    const filter = await getConnection().query(sql);
    return filter;

}

export async function getOfertaDestaque(page: number, tipo : TipoInformacaoEnum){

    if(page === 1){
        ofert_per_page = 4
    }else{
        ofert_per_page = ofert_per_default
    }

    const keyCache = `PERMITIDOS`
    let regraFiltro = await getCache(keyCache);  

    let page_use = (ofert_per_page * page) -1 ;
    const sql = `
                select  
                    ${sqlAtributes}
                from oferta f
                        inner join loja l on (l."uidLoja" = f."lojaUidLoja")
                        inner join categoria c on (c."uidCategoria" = f."categoriaUidCategoria")
                where f.expirado = 'F' 
                    --and ((f."preco" <> f."precoForm" or f."dsCupon" is not null)
                    and (f."categoriaUidCategoria" in ('ba689960-05de-47c2-9b52-79165ccb0f23','6a642ac7-d2e2-43d2-99a7-84ef6bdd3d51', '1bdd1e99-b09a-4281-acf6-f42be5c3510b', 'ebe198dd-ff51-4e25-9d48-48c3ed75aa0a')
					and f."lojaUidLoja" not in ('e6015a4a-82ec-47be-96d9-833b56d79029')
                    and  ((f."preco" > 0 or f."dsCupon" is not null)
                    ${!isEmpty(regraFiltro) && !isEmpty(regraFiltro.listaDescricaoPermitidas)  ? getWhereCustomizado(regraFiltro.listaDescricaoPermitidas,'like', 'or') : ''}
                    ${!isEmpty(regraFiltro) && !isEmpty(regraFiltro.listaDescricaoBloqueadas) ? getWhereCustomizado(regraFiltro.listaDescricaoBloqueadas,'not like', 'and') : ''}
                    ${(isEmpty(tipo)) ? '':`and f.origem = ${tipo} ` } 
                    )
                    or f."destaque" = 'T'
                    or f."fixado" = 'T')
                    
                    order by f.created_at desc
                limit ${ofert_per_page} offset ${page_use}`;

    const filter = await getConnection().query(sql);
    return filter;

    /*
     ${!isEmpty(retorno.data.listaLojasBloqueadas) ? getWherePorLista(retorno.data.listaLojasBloqueadas, "idLoja", "not in") : ''}
                    ${!isEmpty(retorno.data.listaLojasPermitidas) ? getWherePorLista(retorno.data.listaLojasPermitidas, "idLoja", "in") : ''}
                    ${!isEmpty(retorno.data.listaCategoriasBloqueadas) ? getWherePorLista(retorno.data.listaCategoriasBloqueadas, "idCategoria", "not in") : ''}
                    ${!isEmpty(retorno.data.listaCategoriasPermitidas) ? getWherePorLista(retorno.data.listaCategoriasPermitidas, "idCategoria", "in") : ''}
                 
                    */

}

function getWhereCustomizado(objList: any [], equal: string, condition: string){

    

    let sql = ''
    for (const key in objList) {
       
        if(isEmpty(sql)){
            sql = ` ${sql} lower(f."descricao") ${equal} '%${objList[key].toLowerCase()}%'`
        }else{
            sql = ` ${sql} ${condition} lower(f."descricao") ${equal} '%${objList[key].toLowerCase()}%'`
        }
    }

    sql = `and (${sql})`

    return sql;
}

export async function getOfertaRecentes(page: number, tipo : TipoInformacaoEnum){
    

    if(page == 1){
        ofert_per_page = 4
    }else{
        ofert_per_page = ofert_per_default
    }

    let page_use = (ofert_per_page * page) - ofert_per_page;
    const sql = `
        select  
               ${sqlAtributes}
        from oferta f
                inner join loja l on (l."uidLoja" = f."lojaUidLoja")
	            inner join categoria c on (c."uidCategoria" = f."categoriaUidCategoria")
        where f.expirado = 'F' ${(isEmpty(tipo)) ? '':`and f.origem = ${tipo} ` } 
            order by f."fixado", f.created_at desc
        limit ${ofert_per_page} offset ${page_use}`;
    const filter = await getConnection().query(sql);
    return filter;

}

export async function getOfertaSearch(page: number, search:string, tipo : TipoInformacaoEnum){

    ofert_per_page = 100
    
    let page_use = (ofert_per_page * page) - ofert_per_page;
    let sql = `
                    select 
                        ${sqlAtributes} 
                        
                    from oferta f
                        inner join loja l on (l."uidLoja" = f."lojaUidLoja")
	                    inner join categoria c on (c."uidCategoria" = f."categoriaUidCategoria")
                    WHERE f.expirado = 'F' ${(isEmpty(tipo)) ? '':`and f.origem = ${tipo} ` }
                        and LOWER(f."descricao") like '%${search.toLowerCase()}%'
                    order by f."fixado", f.created_at desc
                    limit ${ofert_per_page} offset ${page_use}`;
    const filter = await getConnection().query(sql);
    return filter;

}

export async function getOfertaShort(short: string){

    const sql = `
        select  
            ${sqlAtributes} 
        from oferta f
                inner join loja l on (l."uidLoja" = f."lojaUidLoja")
	            inner join categoria c on (c."uidCategoria" = f."categoriaUidCategoria")
        where f.linkshort like '${short}'
            order by f."fixado", f.created_at desc
        limit 1 offset 0`;
    const filter = await getConnection().query(sql);
    return filter;

}

export async function getOfertaLink(link: string){

    const sql = `select * from oferta f where f.link like '${link}'`;
    const filter = await getConnection().query(sql);
    return filter;

}

export async function getOfertaUid(uid: string){

    const sql = `select * from oferta f where f.uidOferta = '${uid}'`;
    const filter = await getConnection().query(sql);
    return filter;

}

export async function getOfertaRecentesLoja(page: number, tipo : TipoInformacaoEnum, uidLoja: string, descricaoLoja: string){
    


    let page_use = (ofert_per_page * page) - ofert_per_page;
    
    if(page === 1){
        page_use = 3
    }else{
        ofert_per_page = ofert_per_default
    }

    const sql = `
        select  
               ${sqlAtributes}
        from oferta f
                inner join loja l on (l."uidLoja" = f."lojaUidLoja")
	            inner join categoria c on (c."uidCategoria" = f."categoriaUidCategoria")
        where f.expirado = 'F' ${(isEmpty(tipo)) ? '':`and f.origem = ${tipo} ` } 
        and (l."uidLoja" = ${!isEmpty(uidLoja) ? `'${uidLoja}'` : null} or  l."descricao" like ${!isEmpty(descricaoLoja) ?  `'${descricaoLoja}'` : null} )
            order by f."fixado", f.created_at desc
        limit ${ofert_per_page} offset ${page_use}`;
    const filter = await getConnection().query(sql);
    return filter;

}

export async function getOfertaRecentesCategoria(page: number, tipo : TipoInformacaoEnum, uidCategoria: string, descricaoCategoria: string){

    let page_use = (ofert_per_page * page) - ofert_per_page;

    if(page === 1){
        page_use = 3
    }else{
        ofert_per_page = ofert_per_default
    }
    
    const sql = `
        select  
               ${sqlAtributes}
        from oferta f
                inner join loja l on (l."uidLoja" = f."lojaUidLoja")
	            inner join categoria c on (c."uidCategoria" = f."categoriaUidCategoria")
        where f.expirado = 'F' ${(isEmpty(tipo)) ? '':`and f.origem = ${tipo} ` } 
            and (c."uidCategoria" = ${!isEmpty(uidCategoria) ? `'${uidCategoria}'` : null} or  c."descricao" like ${!isEmpty(descricaoCategoria) ?  `'${descricaoCategoria}'` : null} )
            order by f."fixado", f.created_at desc
        limit ${ofert_per_page} offset ${page_use}`;
        
    const filter = await getConnection().query(sql);
    return filter;

}

function getWherePorLista(list: any, atributo: any , condicao: any){
    
    return;
    let sql = ''

    for (const key in list) {
        if(isEmpty(sql)){
            sql = `${list[key]}`
        }else{
            sql = `${sql},${list[key]}`
        }
    }

    sql = ` and f."${atributo}" ${condicao} (${sql})`

    return sql;
}



export async function setIncrementOferta(quantidade: number, uid: string){

    try {
       
        if(isEmpty(uid)){
            return true;
        }

        const sql = `select * from search s where s."uidOferta" = '${uid}'`
     
        const objExistente = await getConnection().query(sql);

        if(!isEmpty(objExistente)){
            const qt = Number(objExistente[0].grauOferta) + (quantidade > 1 ? quantidade : 1);
            objExistente[0].grauOferta =  qt
            getRepository(Oferta).update( objExistente[0].uidOferta, objExistente[0])
        }

    } catch (error) {
        console.log(error)
    }

    return true;

}