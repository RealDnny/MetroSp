import express from 'express'
import controllerItem  from '../controllers/controllerItem.js'
import upload from '../multerConfig.js'
import uploadController from '../controllers/uploadController.js'
import Admin from '../admin/adminController.js'
import {token} from '../admin/veriToken/verificarToken.js'


const controllerRoutes = express.Router()


controllerRoutes.get('/perdidos', controllerItem.ListarTodosItensPerdidos)
controllerRoutes.get('/achados', controllerItem.ListarTodosItensAchados)
controllerRoutes.post('/file',upload.single('image'),uploadController.uploadcontroller)
controllerRoutes.post('/marcar', controllerItem.marcarItemAchado)
//Rotas do Admin 

controllerRoutes.get('/admin',token,Admin.index)
controllerRoutes.get('/admin/users',token,Admin.listaUser)
controllerRoutes.get('/admin/item/perdidos',token,Admin.ListarTodosItensPerdidosAdmin)
controllerRoutes.get('/admin/item/achados',token,Admin.ListarTodosItensAchadosAdmin)
controllerRoutes.get('/admin/post/lista',token,Admin.ListarTodosPosts)
controllerRoutes.post('/admin/createadmin',token,Admin.AddAdmin)
controllerRoutes.delete('/admin/item/delete/:id',Admin.RemoverItem)
controllerRoutes.post('/admin/login', Admin.LoginAdmin)



export default controllerRoutes