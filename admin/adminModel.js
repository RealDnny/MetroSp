import Prisma from "../prismaClient.js"
import bcrypt from 'bcrypt'
import {HandleResponse} from '../HandleResponse.js'

class AdminModel {
    //Users
    static async listarUser(){
        try {
            const Response = await Prisma.user.findMany()
            if(Response.length === 0){
               return HandleResponse(404,'Usuario não encontrado')
            }
                return HandleResponse(201,'Lista dos usuarios',Response)   
        } catch (error) {
                console.error('Erro ao listar: '+ error.message)
                return HandleResponse(500,'falha ao listar users')            
        }
        
    }

    //Itens
    static async removerItem(id, removerUser = false) {
        if (!id) {
          return HandleResponse(400, "ID inválido ou não fornecido");
        }
    
        try {
          const item = await Prisma.item.findUnique({
            where: {
              id: id,
            },
          });
    
          if (!item) {
            return HandleResponse(404, "Item não encontrado");
          }
          
          await Prisma.image.deleteMany({
            where: {
              itemId: id, // Dependendo do nome da chave estrangeira
            },
          });
          
          await Prisma.item.delete({
            where: {
              id: id,
            },
          });

          if(removerUser == true){
            await Prisma.user.delete({where:{
              id:item.userId
            }})
            return HandleResponse(200, "Item e o usuario foram removidos com sucesso");
          }
    
          return HandleResponse(200, "Item removido com sucesso");
        } catch (error) {
          console.error("Erro ao remover item: " + error.message);
          return HandleResponse(500, "Falha ao remover item", { error: error.message });
        }
      }

      static async listarTodosItensAchadosAdmin(){
        try {
            const listaAchado = await Prisma.item.findMany({
                where: { status: 'found' },
                include: { user: true, images: true }
            });
    
            if (listaAchado.length === 0) {
                return HandleResponse(404, 'Nenhum item encontrado');
            }
    
            return HandleResponse(200, 'Itens achados', listaAchado);
        } catch (error) {
            console.error('Erro ao listar itens achados: ' + error.message);
            return HandleResponse(500, 'Erro ao listar itens achados: ' + error.message);
        }
    }
    
    static async listarTodosItensPerdidosAdmin(){
        try {
            const listaPerdidos = await Prisma.item.findMany({
                where: { status: 'lost' },
                include: { user: true, images: true }
            });
    
            if (listaPerdidos.length === 0) {
                return HandleResponse(404, 'Nenhum item perdido encontrado');
            }
    
            return HandleResponse(200, 'Itens perdidos', listaPerdidos);
        } catch (error) {
            return HandleResponse(500, 'Erro ao listar itens perdidos: ' + error.message);
        }
    }
    
    static async listarTodosPosts(){
      try {
          const post = await Prisma.item.findMany({
            include:{
              user:true,
              images:true
            }
          })
          return HandleResponse(201, 'Lista de posts ', post)
      } catch (error) {
        console.error('error ao post : '+error.message)
        return HandleResponse(500,'Erro ao listar os posts '+error.message)
      }
    }

     static async AddAdmin(data){
    try {
  
      let adminExistente = await Prisma.Admin.findMany()
        
      if(adminExistente.length == 0){
          
          //verificar o email
          const verificarEmail = await Prisma.Admin.findUnique({where:{email:data.email}})
          
          if(verificarEmail){
            return HandleResponse(400, 'Existe um Admin com este email')
          }

          const hashSenha = bcrypt.hashSync(data.senha, 12)
          await Prisma.Admin.create({data:{
            nome:data.nome,
            email:data.email,
            senha:hashSenha,
            status:data.status
          }})
          
           return HandleResponse(201,'Admin criado com sucesso ')
        }else{
          return HandleResponse(400,'Ja existe um Admin cadastrado')
        }

     

    } catch (error) {
      
        console.error('Falha ao criar um Admin /addAdmin/creat: '+error.message)
        return HandleResponse(500,'Falha ao criar um Admin')
    }
  }

 }
    export default AdminModel