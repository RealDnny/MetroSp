import AdminModel from "../admin/adminModel.js"
class adminController {

    static index(req,res){
        res.status(200).json({message:'Index do ADMIN'})
    }
    static async listaUser(req,res){
        try {
             const users = await AdminModel.listarUser()
             return res.status(users.status).json({message:users.message, users: users.details})
        } catch (error) {
             console.error(error.message)
             return res.status(500).json({message:'Erro interno do servidor'}) 
        }
        
    }

    static async ListarTodosItensAchadosAdmin(req,res){
        try {
            const response =await AdminModel.listarTodosItensAchadosAdmin() 
            return res.status(response.status).json({message:response.message, details:response.details})
        } catch (error) {
            return res.status(500).json({message:'Falha interno do Servidor '+error.message})
        }
    }
    static async ListarTodosItensPerdidosAdmin(req,res){
        try {
            const response =await AdminModel.listarTodosItensPerdidosAdmin() 
            return res.status(response.status).json({message:response.message, details:response.details})
        } catch (error) {
            return res.status(500).json({message:'Falha interno do Servidor '+error.message})
        }
    }

    static async ListarTodosPosts(req,res){
        try {
            const post = await AdminModel.listarTodosPosts()
            return res.status(post.status).json({message:post.message, posts:post.details})
        } catch (error) {
            console.error('Erro no Post: '+error.message)
            return res.status(500).json({message:'Falha interno do Servidor '+error.message})
        }
    }

    static async RemoverItem(req,res){

        const ID = parseInt(req.params.id)
            const item = await AdminModel.removerItem(ID)    
            return res.status(item.status).json({message: item.message})        
    }
    
    static async RemoverPost(req,res){
        const ID = parseInt( req.params.id)
        const Rpost =await AdminModel.removerPost(ID)
        return res.status(Rpost.status).json({message:Rpost.message, tes:Rpost.details})
    }

}export default adminController
    
