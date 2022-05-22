import { getConnection } from 'typeorm';

export async function getLojasBase(page: number){

    const ofert_per_page = 100;
    let page_use = (ofert_per_page * page) - ofert_per_page;
    let sql = ` select l."uidLoja", l."descricao", l."thumbnail" from loja l
                    --where (select count(*) from oferta f where f."lojaUidLoja" = l."uidLoja" and f."expirado" <> 'T' group by "lojaUidLoja" limit 1) > 0
                order by l."descricao"    
                    limit ${ofert_per_page} offset ${page_use}`;
    const filter = await getConnection().query(sql);
    return filter;

}
