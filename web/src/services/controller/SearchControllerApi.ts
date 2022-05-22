import api from "../api";

export async function setSearch(search: any){

    const response = await api.get('/setSearch',{
        params: {
          search: search
        }
      });

    return response.data
}
