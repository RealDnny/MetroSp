import express from 'express'
import controllerItem  from '../controllers/controllerItem.js'
import upload from '../multerConfig.js'
import uploadController from '../controllers/uploadController.js'
import Admin from '../admin/adminController.js'
const controllerRoutes =express.Router()


controllerRoutes.get('/perdidos', controllerItem.ListarTodosItensPerdidos)
controllerRoutes.get('/achados', controllerItem.ListarTodosItensAchados)
controllerRoutes.post('/file',upload.single('image'),uploadController.uploadcontroller)
controllerRoutes.post('/marcar', controllerItem.marcarItemAchado)
//Rotas do Admin 
controllerRoutes.get('/admin',Admin.index)
controllerRoutes.get('/admin/users',Admin.listaUser)
controllerRoutes.get('/admin/item/perdidos',Admin.ListarTodosItensPerdidosAdmin)
controllerRoutes.get('/admin/item/achados',Admin.ListarTodosItensAchadosAdmin)
controllerRoutes.delete('/admin/item/delete/:id',Admin.removerItem)
//controllerRoutes.delete('/admin/post/delete/:id',Admin.removerPost)



export default controllerRoutes