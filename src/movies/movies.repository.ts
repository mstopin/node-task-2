import { Movie } from './movie';

export const MOVIES_REPOSITORY = 'MoviesRepository';

export interface MoviesRepository {
  findOneByRandomId(): Promise<Movie>;
  findAll(): Promise<Movie[]>;
  create(newMovie: Omit<Movie, 'id'>): Promise<Movie>;
}
