import { TipoInformacaoEnum } from '../../enum/TipoInformacaoEnum';
import api from '../api'
import { setSearch } from './SearchControllerApi';

export async function getOfertasRecentes(page: number, chave: string, filtro: string){

  //console.log("autenticando")
  //  const auth = await api.get('/auth');    
  let filtroDescricao;
  let filtroSearch:any = filtro;

  console.log(chave)

  let rout = '/recentes';
  if(chave === 'categoria'){
    rout = '/recentescat'

  }else if(chave === 'categoriaRecentes'){
      rout = '/recentescat'
      filtroDescricao = filtro
      filtroSearch = null;

  }else if(chave === 'loja'){

    rout = '/recentesloja'

  }else if(chave === 'loja-recente'){
    rout = '/recentesloja'
    filtroDescricao = filtro
      filtroSearch = null;
      
  }else if(chave === 'search'){
    rout = '/search'
    if(page === 1 && window.location.hostname !== 'localhost'){
      setSearch(filtroSearch)
    }
  }

  const response = await api.get(rout,{
        params: {
          page: page,
          filtro: filtroSearch,
          filtroDescricao: filtroDescricao
    //      token: token
        }
  });
  
    return response.data
}

export async function getOfertas(linkshort: string ){

  //console.log("autenticando")
  //  const auth = await api.get('/auth');    
    const response = await api.get('/lk',{
        params: {
          linkshort: linkshort,
    //      token: token
        }
      });
  
    return response.data
}

export async function getCuponsRecentes(page: number){


  const response = await api.get('/recentes',{
        params: {
          page: page,
          tipoInformacao: TipoInformacaoEnum.CUPONS,
        }
  });
  
    return response.data
}

export async function getOfertasDestaque(page: number){


  const response = await api.get('/destaque',{
        params: {
          page: page,
        }
  });
  
    return response.data
}