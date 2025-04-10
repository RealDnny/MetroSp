import modelItem from '../models/modelsItem.js'
class controllerItem {

    static async ItemLista (req, res){
        try {
            const response = await modelItem.itemLista()
            return res.status(response.status).json({message: response.message, itens:response.details})
            
        } catch (error) {
            console.error('Erro listar itens > '+error.message)
            return res.status(500).json({message:'Falha interno do Servidor '+error.message})
        }
    }

    static async PesquisarItem (req,res){
       try {
            const data ={
                nomeItem: req.body.nomeItem
            }
          const response =  await modelItem.pesquisarItem(data)
    
          res.status(response.status).json({message: response.message, item: response.details})
       } catch (error) {
        return res.status(500).json({message:'Falha interno do Servidor '+error.message})    
       }
    }

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