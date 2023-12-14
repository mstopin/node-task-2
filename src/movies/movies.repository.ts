import { Movie } from './movie';

export interface MoviesRepository {
  create(newMovie: Omit<Movie, 'id'>): Promise<Movie>;
}
