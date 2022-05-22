import { getConnection } from 'typeorm';

export async function getCategoriasBase(page: number){

    const ofert_per_page = 20;

    let page_use = (ofert_per_page * page) - ofert_per_page;
    let sql = ` select c."uidCategoria", c."descricao" from categoria c
                order by c."descricao"    
                    limit ${ofert_per_page} offset ${page_use}`;
    const filter = await getConnection().query(sql);
    return filter;

}