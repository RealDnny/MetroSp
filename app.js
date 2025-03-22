dotenv.config()
import dotenv from 'dotenv'
import controllerRoutes from './routes/controllRoutes.js'
const PORT = process.env.PORT

import express from 'express'
import cors from 'cors'
const app = express() 
app.use(express.json())

app.use(cors())
app.use('/',controllerRoutes)

app.listen(PORT,()=>{console.debug(`SERVIDOR RODANDO NA PORTA ${PORT}`)})