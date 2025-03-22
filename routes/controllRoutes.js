import express from 'express'
import controllerItem  from '../controllers/controllerItem.js'
import upload from '../multerConfig.js'
import uploadController from '../controllers/uploadController.js'

const controllerRoutes =express.Router()


controllerRoutes.get('/perdidos', controllerItem.ListarTodosItensPerdidos)
controllerRoutes.get('/achados', controllerItem.ListarTodosItensAchados)
controllerRoutes.post('/file',upload.single('image'),uploadController.uploadcontroller)
controllerRoutes.post('/marcar', controllerItem.marcarItemAchado)

export default controllerRoutes