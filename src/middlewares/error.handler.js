export const logError = (error, req, res, next) => {
  console.log(error)
  next(error)
}

export const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    message: error.message
    // stack: error.stack
  })
}
