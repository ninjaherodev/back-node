import express from 'express'
import { corsMiddleWare } from './middlewares/cors.js'

const port = process.env.PORT ?? 3010

export const app = express()
app.set('port', port)
app.disable('x-powered-by')
app.use(express.json())
app.use(corsMiddleWare())
