import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://172.20.217.217:8080',
  'http://localhost:80',
  'http://production.com',
  'http://fabio.com:8080'
]
export const corsMiddleWare = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by CORS'))
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Puedes ajustar los métodos permitidos aquí
    allowedHeaders: ['Content-Type', 'Authorization'] // Puedes ajustar los encabezados permitidos aquí
  })
