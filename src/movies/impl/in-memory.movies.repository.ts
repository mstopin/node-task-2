import { Movie } from '../movie';
import { MoviesRepository } from '../movies.repository';

export class InMemoryMoviesRepository implements MoviesRepository {
  constructor(public movies: Movie[]) {}

  findOneByRandomId(): Promise<Movie> {
    return Promise.resolve(this.movies[0]!);
  }

  findAll(): Promise<Movie[]> {
    return Promise.resolve(this.movies);
  }

  create(newMovie: Omit<Movie, 'id'>): Promise<Movie> {
    const id = this.movies.length;
    const movie = {
      id,
      ...newMovie,
    };

    this.movies.push(movie);

    return Promise.resolve(movie);
  }
}
