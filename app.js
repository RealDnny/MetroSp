import dotenv from 'dotenv'

import path from 'path';
import { fileURLToPath } from 'url';

// Obtendo o __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config()
import controllerRoutes from './routes/controllRoutes.js'
import { fatalError, erroDeEnderecamento } from './middleware/HandleError.js'
import { RateLimit } from './middleware/rateLimit.js'

import express from 'express'

import cors from 'cors'

const PORT = process.env.PORT
const app = express() 

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'tmp/uploads')))
//app.use(express.static())
app.use(cors())

app.use(RateLimit())
app.use('/',controllerRoutes)

app.use(erroDeEnderecamento)

app.use(fatalError)

app.listen(PORT,()=>{console.debug(`SERVIDOR RODANDO NA PORTA ${PORT}`)})