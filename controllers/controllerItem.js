import modelItem from '../models/modelsItem.js'
class controllerItem {

    static async ListarTodosItensPerdidos(req,res){
        try {
            const response =await modelItem.listarTodosItensPerdidos() 
            return res.status(response.status).json({message:response.message,  details:response.details})
        } catch (error) {
            return res.status(500).json({message:'Falha interno do Servidor '+error.message})
        }
    }

    static async ListarTodosItensAchados(req,res){
        try {
            const response =await modelItem.listarTodosItensAchados() 
            return res.status(response.status).json({message:response.message,  details:response.details})
        } catch (error) {
            return res.status(500).json({message:'Falha interno do Servidor '+error.message})
        }
    }

    static async marcarItemAchado (req,res){
        try {
            const {id,status}=req.body
            const response = await modelItem.MarcarItemComoAchado({id,status})
            return res.status(response.status).json({message:response.message, details: response.details})
        } catch (error) {
            return res.status(500).json({message:'Falha interno do Servidor '+error.message})
        }
    }
}
export default controllerItem