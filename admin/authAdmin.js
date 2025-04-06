import Prisma from "../prismaClient.js";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import { HandleResponse } from "../HandleResponse.js";


class LoginAdmin {

    static async login (data){
        if(!data.email){
            return HandleResponse(200,'Email invalido ou nao informado')
        } 
        
        if(!data.senha){
            return HandleResponse(200,'Senha invalido ou nao informado')
        }

        const VerificarAdmin =  await Prisma.admin.findMany()
        
        if(VerificarAdmin.length == 0){
            return HandleResponse(201,'Não Existe nenhum admin cadastrado, por favor cadastre um')
        }

       const login =  await Prisma.Admin.findUnique({
        where:{email:data.email}
       })

        if(!login){
            return HandleResponse(201,'Email não existe')
        }

        //verificar senha 
        const verificarSenha = await bcrypt.compare(data.senha,login.senha)
        if (!verificarSenha){
            return HandleResponse(401,'Senha invalida') 
        }

        const Payload = {
            user:login.nome,
            email: login.email,
            status:login.status,
            expiresIn: '1h'
            
        }

        const Token = JWT.sign(Payload,process.env.SECRETjwt)
        console.log('token: '+Token)

        return HandleResponse(200,'Token criado', Token)

    }
} export default LoginAdmin