/* eslint-disable space-before-function-paren */
export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
  }
}
