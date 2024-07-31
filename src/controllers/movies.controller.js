import { MovieService } from '../services/movies.service.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import {
  validateMovie,
  validatePartialMovie
} from '../schemas/movies.schema.js'
export class MovieController {
  static findAll = asyncHandler(async (req, res, next) => {
    const { genre } = req.query
    const movies = await MovieService.findAll({ genre })
    res.status(200).json(movies)
  })

  static findOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const movie = await MovieService.findOne({ id })
    res.status(200).json(movie)
  })

  static create = asyncHandler(async (req, res, next) => {
    const movie = req.body
    const movieValidated = validateMovie(movie)
    if (!movieValidated.success) {
      return res
        .status(422)
        .json({ error: JSON.parse(movieValidated.error.message) })
    }
    const newMovie = await MovieService.create({ input: movieValidated.data })
    res.status(201).json(newMovie)
  })

  static update = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const movie = req.body
    const movieValidated = validatePartialMovie(movie)
    if (!movieValidated.success) {
      return res
        .status(422)
        .json({ error: JSON.parse(movieValidated.error.message) })
    }
    const updateMovie = await MovieService.update({
      id,
      input: movieValidated.data
    })
    res.status(200).json(updateMovie)
  })

  static delete = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    await MovieService.delete({ id })
    res.json({ message: 'movie deleted' })
  })
}
