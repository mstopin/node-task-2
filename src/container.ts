import { WinstonLogger } from './common/impl/winston.logger';
import { LOGGER } from './common/logger';
import { GENRES_REPOSITORY } from './genres/genres.repository';
import { FileDatabaseGenresRepository } from './genres/impl/file-database.genres.repository';
import { FileDatabaseMoviesRepository } from './movies/impl/file-database.movies.repository';
import { MOVIES_REPOSITORY } from './movies/movies.repository';
import Container from 'typedi';

export function setUpContainer() {
  Container.set(LOGGER, new WinstonLogger());
  Container.set(GENRES_REPOSITORY, new FileDatabaseGenresRepository());
  Container.set(MOVIES_REPOSITORY, new FileDatabaseMoviesRepository());
}
