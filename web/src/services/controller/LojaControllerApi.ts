import api from "../api";

export async function getLojas(page: number){
    
    const response = await api.get('/lojas',{
        params: {
          page: page
        }
      });

    return response.data
}


export async function getLoja(uidLoja: string){
    
  const response = await api.get('/loja',{
      params: {
        uidLoja: uidLoja
      }
    });

  return response.data
}