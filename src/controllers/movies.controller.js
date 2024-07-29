import { MovieService } from '../services/movies.service.js'
import {
  validateMovie,
  validatePartialMovie
} from '../schemas/movies.schema.js'
export class MovieController {
  static findAll = async (req, res, next) => {
    try {
      const { genre } = req.query
      const movies = await MovieService.findAll({ genre })
      res.json(movies)
    } catch (error) {
      next(error)
    }
  }

  static findOne = async (req, res, next) => {
    try {
      const { id } = req.params
      const movie = await MovieService.findOne({ id })
      res.json(movie)
    } catch (error) {
      next(error)
    }
  }

  static create = async (req, res, next) => {
    try {
      const movie = req.body
      const movieValidated = validateMovie(movie)
      if (!movieValidated.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(movieValidated.error.message) })
      }
      const newMovie = await MovieService.create({ input: movieValidated.data })
      res.status(201).json(newMovie)
    } catch (error) {
      next(error)
    }
  }

  static update = async (req, res, next) => {
    try {
      const { id } = req.params
      const movie = req.body
      const movieValidated = validatePartialMovie(movie)
      if (!movieValidated.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(movieValidated.error.message) })
      }
      const updateMovie = await MovieService.update({
        id,
        input: movieValidated.data
      })
      res.json(updateMovie)
    } catch (error) {
      next(error)
    }
  }

  static delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const deletedMovie = await MovieService.delete({ id })
      if (deletedMovie === false) {
        return res.status(404).json({ message: 'movie not found' })
      }
      res.json({ message: 'movie deleted' })
    } catch (error) {
      next(error)
    }
  }
}
