import { Movie } from './movie';

export interface MoviesRepository {
  create(): Promise<Movie>;
}
