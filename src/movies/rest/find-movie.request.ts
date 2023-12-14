import { z } from 'zod';

export const FindMovieRequestSchema = z.object({
  duration: z.optional(z.coerce.number()),
  genres: z.optional(z.array(z.string())),
});

export type FindMovieRequest = z.infer<typeof FindMovieRequestSchema>;
