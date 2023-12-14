import 'dotenv/config';
import 'reflect-metadata';
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
import Container from 'typedi';
import { GENRES_REPOSITORY } from './genres/genres.repository';
import { FileDatabaseGenresRepository } from './genres/impl/file-database.genres.repository';
import { MOVIES_REPOSITORY } from './movies/movies.repository';
import { FileDatabaseMoviesRepository } from './movies/impl/file-database.movies.repository';
import { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR } from './common/http';

function createErrorHandler() {
  return function (err: Error, _: Request, res: Response, __: NextFunction) {
    if (err instanceof ZodError) {
      return res.status(HTTP_BAD_REQUEST).json({
        errors: err.issues.map((i) => i.message),
      });
    }

    if (err instanceof DomainRuleBrokenError) {
      return res.status(HTTP_BAD_REQUEST).json({
        error: err.message,
      });
    }

    console.error(err);

    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({
      error: 'Internal server error',
    });
  };
}

(async function main() {
  Container.set(GENRES_REPOSITORY, new FileDatabaseGenresRepository());
  Container.set(MOVIES_REPOSITORY, new FileDatabaseMoviesRepository());

  const moviesController = Container.get(MoviesController);
  const app = express();

  app.use(json());
  app.use(urlencoded({ extended: true }));

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

  app.use(createErrorHandler());

  app.listen(Number(process.env['APP_PORT'] ?? 3000), () =>
    console.log('Server is up'),
  );
})().catch(console.error);
