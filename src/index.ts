import 'dotenv/config';
import { GenresService } from './genres/genres.service';
import { FileDatabaseGenresRepository } from './genres/impl/file-database.genres.repository';
import { FileDatabaseMoviesRepository } from './movies/impl/file-database.movies.repository';
import { MoviesService } from './movies/movies.service';
import { MoviesController } from './movies/rest/movies.controller';

import express, { json, urlencoded } from 'express';
import asyncHandler from 'express-async-handler';

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

  app.post(
    '/movies',
    asyncHandler(async (req, res) => {
      await moviesController.create(req, res);
    }),
  );

  app.listen(3000, () => console.log('Server is listening on 3000'));
})().catch(console.error);
