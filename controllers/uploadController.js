import modelItem from "../models/modelsItem.js";
import Joi from "joi";

const item_Schema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    desc:Joi.string().required(),
    status: Joi.string().valid('lost', 'found'),
    location: Joi.string().required(),
    nameItem: Joi.string().required()
})
class UploadController {
   
    static  uploadcontroller = async  (req, res) => {
        try {
            
            const {error}= item_Schema.validate(req.body)
             if(error){
                 return res.status(400).json({message:error.details[0].message})
             }

            if (!req.file) {
                 return res.status(400).json({ message: "Nenhum arquivo enviado" });
             }             
            const  dados ={ 
                 name:req.body.name,
                 email:req.body.email,
                 desc:req.body.desc,
                 status: req.body.status || null ,
                 location:req.body.location,
                 file: req.file,
                 nameItem: req.body.nameItem
             }
             console.log(dados.nameItem)
                const Response = await modelItem.cadastrarNovoItem(dados)
                return res.status(Response.status).json({message: Response.message})
                  
        } catch (error) {
            return res.status(500).json({message: 'Erro interno do Upload'})
        }
    }
    
    
}export default UploadController

 