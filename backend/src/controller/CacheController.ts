import axios from "axios";
import { TipoInformacaoEnum } from "../enum/TipoInformacaoEnum";
import { isEmpty } from "../tools/Empty";
import Redis from "redis";
import { endPointDesEnum, endPointProdEnum } from "../enum/EndPointEnum";
const endPoint = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? endPointProdEnum : endPointDesEnum)

const port = (process.env.NODE_ENV === 'production' ||  process.env.NODE_ENV === 'test' ? 3333 : 3333);
const redis = require('promise-redis')();
const redisClient = redis.createClient();

export async function getCache(key: any){
    const ret = await redisClient.get(key);
    return !ret ? null : JSON.parse(ret);
}

export async function setCache(key: any, value: any, timeExp: any) {
    if(isEmpty(timeExp)){
        return redisClient.set(key, JSON.stringify(value));     
    }
    return redisClient.set(key, JSON.stringify(value), "EX", timeExp); 
}

export async function setCacheTime(key: any, value: any) {
    return redisClient.set(key, JSON.stringify(value));     
}

export async function initCache(){

    await excluirCache();
  
    //FICAR REPROCESSANDO CHAVES 
    do{
        
        try {

            for (let index = 1; index <= 2; index++) {
                await axios.get(`http://localhost:${port}/categorias`, {
                    params: {
                        page: index
                    }
                })
            }
        } catch (error) {
            
        }
        try{
    
            for (let index = 1; index <= 6; index++) {
                axios.get(`http://localhost:${port}/lojas`, {
                    params: {
                        page: index
                    }
                })
            }
    
        } catch (error) {
            
        }  

        try{
            for (let index = 1; index <= 20; index++) {
                await axios.get(`http://localhost:${port}/destaque`, {
                    params: {
                        page: index,
                        reprocessar: true
                    }
                })    
            }
        } catch (error) {
            
        }
        
        try{
            for (let index = 1; index <= 20; index++) {
                await axios.get(`http://localhost:${port}/recentes`, {
                    params: {
                        page: index,
                        tipoInformacao: TipoInformacaoEnum.CUPONS,
                        reprocessar: true
                    }
                })    
            }
        } catch (error) {
            
        }
    
        try{
            for (let index = 1; index <= 20; index++) {
                await axios.get(`http://localhost:${port}/recentes`, {
                    params: {
                        page: index,
                        reprocessar: true
                    }
                })    
            }
        } catch (error) {
            
        }
    
        await sleep(10000)
        
    }while(true);
 
}

async function excluirCache(){

    
        const redis = Redis.createClient();
        const ret: any = await redis.keys('*')
      
        for (const key in ret) {
            if(!isEmpty(ret[key])){
                await redis.del(ret[key], function(err: any, response: any) {})
            }
        }  
        redis.on("exit", function(){
            redis.quit();
        });
     

}

async function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}   

