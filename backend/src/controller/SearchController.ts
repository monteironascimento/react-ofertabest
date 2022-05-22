import { getConnection, getRepository } from 'typeorm';
import { Search } from '../entity/Search';
import { isEmpty } from '../tools/Empty';

export async function setSearchLog(search: any){

    try {
       
        if(isEmpty(search)){
            return true;
        }
        
        let tpSituacao = 'I'
        let objPersiste: any = {
            descricao: search,
            quantidade: 1
        }
        const sql = `select * from search s where s."descricao" = '${search}'`
     
        const objExistente = await getConnection().query(sql);

        if(!isEmpty(objExistente)){
            const qt = Number(objExistente[0].quantidade) + 1;
            tpSituacao = 'A'
            objPersiste = {
                uidSearch: objExistente[0].uidSearch,
                descricao: search,
                quantidade: qt,
                ativado: objExistente[0].ativado
            }
        }else{
            tpSituacao = 'I'
        }
        if(tpSituacao === 'I'){
            getRepository(Search).save(objPersiste);
        }else if(tpSituacao === 'A'){
            getRepository(Search).update( objPersiste.uidSearch, objPersiste)
        }else if(tpSituacao === 'A' && objPersiste.tpProcesso === 'D'){
            getRepository(Search).delete(objPersiste.uidSearch ); 
        }

    } catch (error) {
        console.log(error)
    }

    return true;

}
