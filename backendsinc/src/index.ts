// Lodash library
import "reflect-metadata";
import { createConnection } from 'typeorm';
import express from "express";
import routes from './routes'
import axios from "axios";
const port = (process.env.NODE_ENV === 'production' ||process.env.NODE_ENV === 'test' ? 3071 : 3070);
import { endPointDesEnum , endPointProdEnum} from '../src/enum/EndPointEnum';
const endPoint = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? endPointProdEnum : endPointDesEnum)

const app = express();

createConnection().then( ret =>{
    console.log(`START  NODE-CRUD-DATABASE BACKEND - AMBIENTE ${process.env.NODE_ENV}   PORTA ${port}`)
    //notificar("Start")
})

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));

app.use(express.json());
app.use(routes);

app.listen(port);


/*
async function notificar(mensagem: any){
    try {
        axios.get(`${endPoint.urlServidorTelegram}/error`, {
            params: {
                mensagem: `BackSinc - ${mensagem}`
            }
        })
    } catch (error) {
        
    }
}*/


