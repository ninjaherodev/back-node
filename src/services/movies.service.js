import { readJson } from '../util.js'
// import movies from '../../movies.json' with { type: 'json' } // future
import { randomUUID } from 'node:crypto'

const movies = readJson('../movies.json')

export class MovieService {
  static findAll = async ({ genre }) => {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static findOne = async ({ id }) => {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static create = async ({ input }) => {
    const newMovie = {
      id: randomUUID(),
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }

  static delete = async ({ id }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) {
      throw new Error('movie not found')
    }
    movies.splice(movieIndex, 1)
    return true
  }

  static update = async ({ id, input }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) {
      throw new Error('movie not found')
    }
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }
    return movies[movieIndex]
  }
}