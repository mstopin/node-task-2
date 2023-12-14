import { Movie } from './movie';

export interface MoviesRepository {
  findOneByRandomId(): Promise<Movie>;
  findAll(): Promise<Movie[]>;
  create(newMovie: Omit<Movie, 'id'>): Promise<Movie>;
}
