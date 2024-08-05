import { CustomError } from '../errors/CustomError.js'
import { ZodError } from 'zod'

// Middleware para registrar errores
export const logError = (error, req, res, next) => {
  console.error(error) // Utiliza console.error para errores
  next(error)
}

// Middleware para manejar errores
export const errorHandler = (error, req, res, next) => {
  // Crea una estructura de error común
  const createErrorResponse = (status, message, name, details) => ({
    status,
    message,
    name,
    ...details
  })

  if (error instanceof ZodError) {
    // Manejo de errores de Zod
    return res
      .status(422)
      .json(
        createErrorResponse(422, 'Validation error', 'ZodError', {
          issues: error.issues
        })
      )
  }

  if (error instanceof CustomError) {
    // Manejo de errores personalizados
    return res
      .status(error.statusCode)
      .json(createErrorResponse(error.statusCode, error.message, error.name))
  }

  // Manejo de errores genéricos
  return res
    .status(error.statusCode || 500)
    .json(
      createErrorResponse(
        error.statusCode || 500,
        error.message || 'Internal Server Error',
        error.name || 'UnknownError'
      )
    )
}

// import { CustomError } from '../errors/CustomError.js'
// import { ZodError } from 'zod'
// export const logError = (error, req, res, next) => {
//   console.log(error)
//   next(error)
// }

// export const errorHandler = (error, req, res, next) => {
//   if (error instanceof ZodError) {
//     // Manejo de errores de Zod
//     return res.status(422).json({
//       status: 422,
//       message: 'Validation error',
//       name: error.issues // Proporciona detalles de validación
//     })
//   }

//   if (error instanceof CustomError) {
//     return res.status(error.statusCode).json({
//       status: error.statusCode,
//       message: error.message,
//       name: error.name
//     })
//   }
//   res.status(error.statusCode || 500).json({
//     status: error.statusCode || 500,
//     message: error.message,
//     name: error.name

//     // stack: error.stack
//   })
// }
