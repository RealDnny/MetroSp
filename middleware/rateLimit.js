import rateLimit from "express-rate-limit";
export function RateLimit (){

    const limitPorIp = rateLimit({
        windowMs:15*60*1000,
        max:50,
        message:'Excessoo de requisições, tente daqui ha 15minutos',
        handler:true
    })
    return limitPorIp
    
}