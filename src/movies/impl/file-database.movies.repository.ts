import { Genre } from 'genres/genre';
import { FileDatabaseRepository } from '../../common/file-database.repository';
import { Movie } from '../movie';
import { MoviesRepository } from '../movies.repository';
import { FileDatabaseMovieData } from './file-database.movie';

export class FileDatabaseMoviesRepository
  extends FileDatabaseRepository<FileDatabaseMovieData>
  implements MoviesRepository
{
  constructor() {
    super();
  }

  async create(newMovie: Omit<Movie, 'id'>): Promise<Movie> {
    const movies = this.persistenceToDomain(await this.readData());

    const movie: Movie = {
      ...newMovie,
      id: movies[movies.length - 1]?.id ?? 1,
    };

    movies.push(movie);
    await this.saveData(this.domainToPersistence(movies));

    return movie;
  }

  private domainToPersistence(movies: Movie[]): FileDatabaseMovieData {
    return {
      movies: movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        year: String(movie.year),
        runtime: String(movie.runtime),
        genres: movie.genres.map((g) => g.name),
        director: movie.director,
        actors: movie.actors ?? null,
        plot: movie.plot ?? null,
        posterUrl: movie.posterUrl ?? null,
      })),
    };
  }

  private persistenceToDomain(data: FileDatabaseMovieData): Movie[] {
    return data.movies.map((databaseMovie) => ({
      id: databaseMovie.id,
      title: databaseMovie.title,
      year: Number(databaseMovie.year),
      runtime: Number(databaseMovie.runtime),
      genres: databaseMovie.genres.map<Genre>((g) => ({ name: g })),
      director: databaseMovie.director,
      actors: databaseMovie.actors !== null ? databaseMovie.actors : undefined,
      plot: databaseMovie.plot !== null ? databaseMovie.plot : undefined,
      posterUrl:
        databaseMovie.posterUrl !== null ? databaseMovie.posterUrl : undefined,
    }));
  }
}
