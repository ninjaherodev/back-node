export const schemaValidator = (schema, property, isPartial = false) => {
  return (req, res, next) => {
    const data = req[property]

    if (!data) {
      return next(new Error('property invalid in schemaValidator'))
    }

    const result = isPartial
      ? schema.partial().safeParse(data)
      : schema.safeParse(data)

    if (result.success) {
      req[property] = result.data
      next()
    } else {
      next(result.error)
    }
  }
}
