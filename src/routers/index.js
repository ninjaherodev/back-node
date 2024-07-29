import { Router } from 'express'
import { routerMovies } from './movies.router.js'

export const routerApi = (app) => {
  const router = Router()
  app.use('/api/v1', router)
  router.use('/movies', routerMovies)
}
