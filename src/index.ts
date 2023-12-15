import 'dotenv/config';
import 'reflect-metadata';
import { MoviesController } from './movies/rest/movies.controller';
import express, { json, urlencoded } from 'express';
import asyncHandler from 'express-async-handler';
import { Container } from 'typedi';
import { createErrorHandler } from './error-handler';
import { setUpContainer } from './container';
import { LOGGER, Logger } from './common/logger';

setUpContainer();

const logger = Container.get<Logger>(LOGGER);

(async function main() {
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
    logger.info('Server is up'),
  );
})().catch(logger.error);
