import { Router } from 'express'
import { MovieController } from '../controllers/movies.controller.js'
import { movieSchema, movieSchemaId } from '../schemas/movies.schema.js'
import { schemaValidator } from '../middlewares/schemaValidator.js'
import { PROPERTIES_REQUEST } from '../utils/propertiesRequest.js'
export const routerMovies = Router()

routerMovies.get('/', MovieController.findAll)
routerMovies.get(
  '/:id',
  schemaValidator(movieSchemaId, PROPERTIES_REQUEST.PARAMS),
  MovieController.findOne
)
routerMovies.post(
  '/',
  schemaValidator(movieSchema, PROPERTIES_REQUEST.BODY),
  MovieController.create
)
routerMovies.patch(
  '/:id',
  schemaValidator(movieSchemaId, PROPERTIES_REQUEST.PARAMS),
  schemaValidator(movieSchema, PROPERTIES_REQUEST.BODY, true),
  MovieController.update
)
routerMovies.delete(
  '/:id',
  schemaValidator(movieSchemaId, PROPERTIES_REQUEST.PARAMS),
  MovieController.delete
)
