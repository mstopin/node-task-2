import { Request, Response } from 'express';
import { MoviesService } from '../movies.service';
import { CreateMovieRequestSchema } from './create-movie.request';
import { FindMovieRequestSchema } from './find-movie.request';
import { Service } from 'typedi';
import { HTTP_CREATED } from '../../common/http';

@Service()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  async find(req: Request, res: Response) {
    const findMovieRequest = FindMovieRequestSchema.parse(req.query);

    const movies = await this.moviesService.find({
      duration: findMovieRequest.duration,
      genres: findMovieRequest.genres,
    });

    return res.json({
      data: movies,
    });
  }

  async create(req: Request, res: Response) {
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

    return res.status(HTTP_CREATED).json(movie);
  }
}
