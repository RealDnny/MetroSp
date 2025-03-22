import modelItem from "../models/modelsItem.js";
import Joi from "joi";

const item_Schema = Joi.object({
    name:Joi.string().min(6).required(),
    email:Joi.string().email().required(),
    desc:Joi.string().min(10).required(),
    status: Joi.string().valid('lost', 'found'),
    location: Joi.string().required()
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
                 status: req.body.status,
                 location:req.body.location,
                 file: req.file
             }
                const Response = await modelItem.cadastrarNovoItem(dados)
                 return res.status(Response.status).json({message: Response.message})
                  
        } catch (error) {
            return res.status(500).json({message: 'Erro interno do Upload'})
        }
    }
    
    
}export default UploadController

 