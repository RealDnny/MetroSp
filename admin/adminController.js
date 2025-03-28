
import AdminModel from "../admin/adminModel.js"
import authAdmin from '../admin/authAdmin.js'
import Joi from 'joi'

    const auth = Joi.object({
        nome:Joi.string().required(),
        email:Joi.string().email().required(),
        senha:Joi.string().min(6).required(),
        status:Joi.string().valid("on","off").required()
    })

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
        try {
            const ID = parseInt(req.params.id)
            const item = await AdminModel.removerItem(ID)    
            return res.status(item.status).json({message: item.message})        
            
        } catch (error) {
            console.error('Erro ao remover o Item /admin/item/delete '+error.message)
            return res.status(500).json({message:'Falha ao remover o item'})
        }
    }

    static async AddAdmin(req, res) {
        try {
            // Valida os dados enviados no corpo da requisição
            const { error } = auth.validate(req.body);
    
            // Se houver erro de validação, retorna um erro 400 com a mensagem
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
    
            // Desestrutura os dados do corpo da requisição
            const { nome, email, senha, status } = req.body;
    
            // Chama o modelo para adicionar o admin
            const admin = await AdminModel.AddAdmin({ nome, email, senha, status });
    
            return res.status(admin.status).json({ message: admin.message });
    
        } catch (error) {
            // Loga o erro no servidor
            console.error('Erro ao criar Admin/create: ' + error.message);
    
            // Retorna um erro 500 se ocorrer qualquer falha no processo
            return res.status(500).json({ message: 'Erro ao criar Admin' });
        }
    }
    
    static async LoginAdmin(req,res){
        try {
            const {email, senha} = req.body
            
            const login = await authAdmin.login({email, senha})

            return res.status(login.status).json({message: login.message, Token: login.details})


        } catch (error) {
            console.error('Erro interno: '+error.message)
            return res.status(500).json({message: 'Erro interno do servidor '})
        }
    }
}export default adminController
    
