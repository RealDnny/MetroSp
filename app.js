import dotenv from 'dotenv'
dotenv.config()
import controllerRoutes from './routes/controllRoutes.js'
import { fatalError, erroDeEnderecamento } from './middleware/HandleError.js'
import { RateLimit } from './middleware/rateLimit.js'

import express from 'express'

import cors from 'cors'
import rateLimit from 'express-rate-limit'
const PORT = process.env.PORT
const app = express() 

app.use(express.json())

app.use(cors())

app.use(RateLimit())
app.use('/',controllerRoutes)

app.use(erroDeEnderecamento)

app.use(fatalError)

app.listen(PORT,()=>{console.debug(`SERVIDOR RODANDO NA PORTA ${PORT}`)})