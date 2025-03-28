import { HandleResponse } from "../../HandleResponse.js"
import JWT from 'jsonwebtoken'

export function token(req,res,next){
        const authHeader = req.headers['authorization']
        
        const token = authHeader && authHeader.split(' ')[1]
        if(!token){
            return res.status(401).json({message:'Token invalido ou nao fornecido'}) 
        } 

        try {
            JWT.verify(token, process.env.SECRETjwt)
            next()
        } catch (error) {
            console.error('Erro ao verificar o token: '+error.message)
            return res.status(500).json({message: 'Erro ao verificar o token'})

        }

    }

