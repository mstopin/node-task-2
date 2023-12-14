import { Movie } from './movie';
import { MoviesRepository } from './movies.repository';

export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async create(): Promise<Movie> {
    return null;
  }
}
