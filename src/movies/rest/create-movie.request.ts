import { z } from 'zod';

export const CreateMovieRequestSchema = z.object(
  {
    genres: z.array(
      z.string().trim().max(255, 'Genre must be at most 255 characters long'),
      {
        invalid_type_error: 'Invalid genres',
        required_error: 'At least one genre is required',
      },
    ),
    title: z
      .string({
        invalid_type_error: 'Invalid title',
        required_error: 'title is required',
      })
      .trim()
      .max(255, 'title must be at most 255 characters long'),
    year: z
      .number({
        invalid_type_error: 'Invalid year',
        required_error: 'year is required',
      })
      .positive('year must be positive'),
    runtime: z
      .number({
        invalid_type_error: 'Invalid runtime',
        required_error: 'duntime is required',
      })
      .positive('duntime must be positive'),
    director: z
      .string({
        invalid_type_error: 'Invalid director',
        required_error: 'director is required',
      })
      .trim()
      .max(255, 'director must be at most 255 characters longs'),
    actors: z.optional(
      z
        .string({ invalid_type_error: 'Invalid actor' })
        .trim()
        .max(1024, 'actors must be at most 1024 characters long'),
    ),
    plot: z.optional(
      z
        .string({ invalid_type_error: 'Invalid plot' })
        .trim()
        .max(1024, 'plot must be at most 1024 characters long'),
    ),
    posterUrl: z.optional(
      z
        .string({ invalid_type_error: 'Invalid posterUrl' })
        .trim()
        .max(1024, 'posterUrl must be at most 1024 characters long'),
    ),
  },
  { required_error: 'Movie is required' },
);

export type CreateMovieRequest = z.infer<typeof CreateMovieRequestSchema>;
