export const logError = (error, req, res, next) => {
  console.log(error)
  next(error)
}

export const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode).json({
    message: error.message,
    name: error.name

    // stack: error.stack
  })
}
