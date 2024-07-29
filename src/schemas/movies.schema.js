import { z } from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'movie title must be a string',
    required_error: 'movie title is required. please check url'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci-Fi'
    ]),
    {
      invalid_type_error: 'movie genre is required',
      required_error: 'Movie genre must be an array of enum Genre'
    }
  )
})

export const validateMovie = (object) => {
  return movieSchema.safeParse(object)
}

export const validatePartialMovie = (object) => {
  return movieSchema.partial().safeParse(object)
}
