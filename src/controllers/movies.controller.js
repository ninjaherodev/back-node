import { MovieService } from '../services/movies.service.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'

export class MovieController {
  static findAll = asyncHandler(async (req, res) => {
    const { genre } = req.query
    const movies = await MovieService.findAll({ genre })
    res.status(200).json(movies)
  })

  static findOne = asyncHandler(async (req, res) => {
    const { id } = req.params
    const movie = await MovieService.findOne({ id })
    res.status(200).json(movie)
  })

  static create = asyncHandler(async (req, res) => {
    const movie = req.body
    const newMovie = await MovieService.create({ input: movie })
    res.status(201).json(newMovie)
  })

  static update = asyncHandler(async (req, res) => {
    const { id } = req.params
    const movie = req.body

    const updateMovie = await MovieService.update({
      id,
      input: movie
    })
    res.status(200).json(updateMovie)
  })

  static delete = asyncHandler(async (req, res) => {
    const { id } = req.params
    await MovieService.delete({ id })
    res.json({ message: 'movie deleted' })
  })
}
