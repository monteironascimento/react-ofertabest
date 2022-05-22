// Lodash library
import "reflect-metadata";
import { createConnection } from 'typeorm';
import express from "express";
import routes from './routes'
import { initCache } from "./controller/CacheController";

const port = (process.env.NODE_ENV === 'production' ||  process.env.NODE_ENV === 'test' ? 3333 : 3333);

const app = express();

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
    res.header('Access-Control-Allow-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
    next();
});

createConnection().then( ret =>{
    console.log(`START  NODE-BACKEND - AMBIENTE ${process.env.NODE_ENV}   PORTA ${port}`)
    //initCache()
})

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));

app.use(express.json());
app.use(routes);

app.listen(port);






