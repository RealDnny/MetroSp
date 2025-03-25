import prisma from '../prismaClient.js';
import emailNotificacao from '../lib/Emailnotificacao.js'

function HandleResponse(status, message, details = null) {
    return { status, message, details };
}

class modelItem {
    static async cadastrarNovoItem(data) {
        try {
            const user = await prisma.User.findUnique({
                where:{email:data.email}
            })
            if(!user){

                user = await prisma.User.create({
                    data: {
                        name: data.name,
                        email: data.email
                    }
                });
            }
         

            const item = await prisma.Item.create({
                data: {
                    name: data.file.filename,    
                    description: data.desc, // Corrigido 'descriptio' para 'description'
                    status: data.status, // 'lost' ou 'found'
                    location: data.location,
                    userId: user.id, // Associa o item ao usuário
                }
            });

            const image = await prisma.Image.create({
                data: {
                    nameImg: data.file.originalname,
                    pathImg: data.file.destination, // Corrigido 'data.fle' para 'data.file'
                    itemId: item.id // Relaciona a imagem ao item
                }
            });

            if(user && item && image){
                return HandleResponse(201, 'Item Postado com Sucesso');
            }
                return HandleResponse(400, 'Falha ao postar item');
        } catch (error) {
            return HandleResponse(404, 'Erro ao Postar um item ' + error.message);
        }
    }

    static async listarTodosItensPerdidos(){
        try {
            const itens = await prisma.item.findMany({where:{status:'lost'}, 
                include:{user:true,images:true}
            })
            if(!itens.length == 0){
                HandleResponse(404,'Sem item perdidos')
            }
               return HandleResponse(200,'itens perdido',itens)

        } catch (error) {
            return HandleResponse(500,'Erro ao listar os itens '+error.message)
        }
    }
    static async listarTodosItensAchados(){
        try {
            const itens = await prisma.item.findMany({where:{status:'found'}, 
                include:{user:true,images:true}
            })
            if(itens.length == 0){
                HandleResponse(404,'Sem item achados')
            }
               return HandleResponse(200,'itens achados',itens)

        } catch (error) {
            return HandleResponse(500,'Erro ao listar os itens achados '+error.message)
        }
    }

    static async MarcarItemComoAchado(data){
        try {
            const itemAchado = await prisma.Item.findUnique({
                where:{
                    id:data.id
                }, include:{
                    user:true
                }
            })

            if(!itemAchado){
                return HandleResponse(404,'Item nao encontrado ',null)
            }

          const statusItemAchado = await prisma.Item.update({where:{
                id:data.id}, 
                data:{
                status:data.status
            }
        })
        if(!statusItemAchado){
            return HandleResponse(404,'Item nao atualizado ', statusItemAchado)
        }
        //IMPLEMENTAR O SISTEMA DE NOTIFICAÇÃO POR EMAIL
        try {
            await emailNotificacao.emailnotificacao()    
        } catch (error) {
            return console.error('Erro interno com o servidor de Email '+ error.message)
        }
        
        
            return HandleResponse(200,'Status do item modificado ', itemAchado)
        } catch (error) {
            return HandleResponse(500,'Erro ao atualizar o status do item '+error.message)
        }    
    }
}
 
export default modelItem;
