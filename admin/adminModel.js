import Prisma from "../prismaClient.js"
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
    static async removerItem(id) {
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
    
          return HandleResponse(200, "Item removido com sucesso");
        } catch (error) {
          console.error("Erro ao remover item: " + error.message);
          return HandleResponse(500, "Falha ao remover item", { error: error.message });
        }
      }
/*
      static async removerPost(id){
        if(!id){
          return HandleResponse(500,'id invalido ou não fornecido')
        }
        try {
          const post = await Prisma.item.findMany({where:{id:id},include:{user:true,images:true}})
            if(!post){
              return HandleResponse(404,'Post não encontrado')
            }

            let rp = await Prisma.item.deleteMany() 
          console.debug(post)
          //return HandleResponse(201,'Exple',post)
        } catch (error) {
          console.error('error ao remover post : '+error.message)
          return HandleResponse(500,'Erro ao remover os posts '+error.message)
        }
      }*/
    static async listarTodosItensAchadosAdmin(){
        try {
            const listaAchado = await Prisma.item.findMany({where:{status:'found'}, include:{user:true,images:true}})
            console.table(listaAchado)
            if(listaAchado.length == 0){
                HandleResponse(404,'Sem item achados')
            }
               return HandleResponse(200,'itens achados',listaAchado)
        } catch (error) {
            console.error('Error ao listar itens achados: '+error.message)
            return HandleResponse(500,'Erro ao listar os itens achados '+error.message)
        }
    }
    static async listarTodosItensPerdidosAdmin(){
        try {
            const listaPerdidos = await Prisma.item.findMany({where:{status:'lost'}, include:{user:true,images:true}})
            console.table(listaPerdidos)
            if(listaPerdidos.length == 0){
                HandleResponse(404,'Sem item perdido')
            }
               return HandleResponse(200,'itens perdidos',listaPerdidos)
        } catch (error) {
            return HandleResponse(500,'Erro ao listar os itens perdidos '+error.message)
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

    }
    export default AdminModel