import { Request, Response } from 'express';
import axios from 'axios';

import { endPointDesEnum , endPointProdEnum} from '../../enum/EndPointEnum';
const endPoint = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? endPointProdEnum : endPointDesEnum)


export const getPostBackLomadee = async (req: Request, res: Response) => {

    axios.get(`${endPoint.urlServidorTelegram}/notifica`, {
        params: {
            mensagem: `Venda ${req.query.codigoTransacao} - VL ${req.query.totalvalue} COM ${req.query.totalComission}`
        }
    })

    return res.status(200).json("OK");
} 


