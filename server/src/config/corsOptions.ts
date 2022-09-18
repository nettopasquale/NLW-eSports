import allowedOrigins from "./allowedOrigins";

const corsOptions = {
    origin: (origin: any, callback: any) =>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){ // se o dominio n está na lista, origin aqui é apenas durante o desenvolvimento
            callback(null, true)
        }else{
            callback(new Error('Não permitido pelo CORS'))
        }
    },
    optionsSucessStatus: 200
}

export default corsOptions