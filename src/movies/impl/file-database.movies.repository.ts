import { FileDatabaseRepository } from 'common/file-database.repository';
import { Movie } from 'movies/movie';
import { MoviesRepository } from 'movies/movies.repository';

export class FileDatabaseMoviesRepository
  extends FileDatabaseRepository<{}>
  implements MoviesRepository
{
  constructor() {
    super();
  }

  async create(): Promise<Movie> {
    throw new Error('Method not implemented.');
  }
}
