import 'dotenv/config';
import { GenresService } from './genres/genres.service';
import { FileDatabaseGenresRepository } from './genres/impl/file-database.genres.repository';
import { FileDatabaseMoviesRepository } from './movies/impl/file-database.movies.repository';
import { MoviesService } from './movies/movies.service';
import { MoviesController } from './movies/rest/movies.controller';

import express, {
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';
import asyncHandler from 'express-async-handler';
import { ZodError } from 'zod';
import { DomainRuleBrokenError } from './common/domain-rule-broken.error';

function errorHandler(err: Error, _: Request, res: Response, __: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      errors: err.issues.map((i) => i.message),
    });
  }

  if (err instanceof DomainRuleBrokenError) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: 'Internal server error',
  });
}

(async function main() {
  const genresService = new GenresService(new FileDatabaseGenresRepository());
  const moviesService = new MoviesService(
    new FileDatabaseMoviesRepository(),
    genresService,
  );
  const moviesController = new MoviesController(moviesService);

  const app = express();

  app.use(json());
  app.use(
    urlencoded({
      extended: true,
    }),
  );

  app.get(
    '/movies',
    asyncHandler(async (req, res) => {
      await moviesController.find(req, res);
    }),
  );

  app.post(
    '/movies',
    asyncHandler(async (req, res) => {
      await moviesController.create(req, res);
    }),
  );

  app.use(errorHandler);

  app.listen(3000, () => console.log('Server is listening on 3000'));
})().catch(console.error);
