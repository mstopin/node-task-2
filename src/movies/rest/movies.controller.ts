import { Request, Response } from 'express';
import { MoviesService } from 'movies/movies.service';
import { CreateMovieRequestSchema } from './create-movie.request';
import { ZodError } from 'zod';
import { DomainRuleBrokenError } from '../../common/domain-rule-broken.error';

export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  async create(req: Request, res: Response) {
    try {
      const createMovieRequest = CreateMovieRequestSchema.parse(req.body);

      const movie = await this.moviesService.create({
        genres: createMovieRequest.genres,
        title: createMovieRequest.title,
        year: createMovieRequest.year,
        runtime: createMovieRequest.runtime,
        director: createMovieRequest.director,
        actors: createMovieRequest.actors,
        plot: createMovieRequest.plot,
        posterUrl: createMovieRequest.posterUrl,
      });

      return res.json(movie);
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          errors: e.issues.map((i) => i.message),
        });
      }

      if (e instanceof DomainRuleBrokenError) {
        return res.status(400).json({
          error: e.message,
        });
      }

      console.error(e);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}
