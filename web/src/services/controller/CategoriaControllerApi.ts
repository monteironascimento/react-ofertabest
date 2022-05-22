import api from "../api";

export async function getCategorias(page: number){

    const response = await api.get('/categorias',{
        params: {
          page: page
        }
      });

    return response.data
}
