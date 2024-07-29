import { Router } from 'express'
import { MovieController } from '../controllers/movies.controller.js'

export const routerMovies = Router()

routerMovies.get('/', MovieController.findAll)
routerMovies.get('/:id', MovieController.findOne)
routerMovies.post('/', MovieController.create)
routerMovies.patch('/:id', MovieController.update)
routerMovies.delete('/:id', MovieController.delete)
