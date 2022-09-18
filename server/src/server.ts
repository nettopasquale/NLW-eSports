import express from 'express';
import cors from 'cors';
import {PrismaClient} from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';
import corsOptions from './config/corsOptions';

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const prisma = new PrismaClient({
    log: ['query']
});

// const allowedOrigins: [
//     'http://127.0.0.1:5173/',
//     'http://localhost:3333'
// ]

//os nomes das rotas sempre devem estar no pural?
//isso pq o findMnay já é assíncrono
app.get('/games', async (req, res)=>{
    const games = await prisma.game.findMany({
        include:{
            _count:{
                select:{
                    ads: true,
                }
            }
        }
    })
    return res.json(games);
});

// validação tb? zod!!
//como todo ad pertence a um game, podemos concatenar ele a um gameId
app.post('/games/:id/ads', async (req, res)=>{
    const gameId = req.params.id;
    const body: any = req.body

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekdays: body.weekdays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return res.status(201).json(ad)
})

// aqui é para cada game em ESPECIFICO
app.get('/games/:id/ads', async (request, response)=>{
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select:{
            id:true,
            name: true,
            weekdays:true,
            useVoiceChannel:true,
            yearsPlaying:true,
            hourStart: true,
            hourEnd: true,
        },
        where:{
            gameId,
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    return response.json(ads.map(ad =>{
        return {
            ...ad,
            weekdays: ad.weekdays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    }))
}) 

app.get('/ads/:id/discord', async (request, response)=>{
    const adId = request.params.id;

    //se n achar o Id dispara o erro
    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true,
        },
        where:{
            id: adId,
        },
    })
    return response.json({
        discord: ad.discord,
    })
}) 
   
app.listen(process.env.PORT || 3333)