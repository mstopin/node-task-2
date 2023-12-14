import { Genre } from '../genres/genre';
import { GenresService } from '../genres/genres.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { Movie } from './movie';
import { MOVIES_REPOSITORY, MoviesRepository } from './movies.repository';
import { DomainRuleBrokenError } from '../common/domain-rule-broken.error';
import { MoviesSearchParams } from './movies.search-params';
import { Inject, Service } from 'typedi';

interface MovieGenreMatch {
  movie: Movie;
  genresMatched: number;
}

@Service()
export class MoviesService {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: MoviesRepository,
    private readonly genresService: GenresService,
  ) {}

  private async findOneRandom(): Promise<Movie> {
    return await this.moviesRepository.findOneByRandomId();
  }

  private filterByDuration(movies: Movie[], duration: number): Movie[] {
    return movies.filter(
      (m) => m.runtime >= duration - 10 && m.runtime <= duration + 10,
    );
  }

  private filterByGenres(movies: Movie[], genres: string[]): Movie[] {
    const matches: MovieGenreMatch[] = [];

    for (const movie of movies) {
      const movieGenresNames = movie.genres.map((g) => g.name);
      let genresMatched = 0;

      for (const genre of genres) {
        if (movieGenresNames.includes(genre)) genresMatched++;
      }

      if (genresMatched > 0) {
        matches.push({ movie, genresMatched });
      }
    }

    return matches
      .sort((a, b) => b.genresMatched - a.genresMatched)
      .map((m) => m.movie);
  }

  private filterByDurationAndGenres(
    movies: Movie[],
    duration: number,
    genres: string[],
  ): Movie[] {
    return this.filterByDuration(this.filterByGenres(movies, genres), duration);
  }

  async find(search: MoviesSearchParams): Promise<Movie[]> {
    if (search.duration !== undefined && search.genres !== undefined) {
      return this.filterByDurationAndGenres(
        await this.moviesRepository.findAll(),
        search.duration,
        search.genres,
      );
    }

    if (search.duration !== undefined && search.genres === undefined) {
      return this.filterByDuration(
        await this.moviesRepository.findAll(),
        search.duration,
      );
    }

    if (search.duration === undefined && search.genres !== undefined) {
      return this.filterByGenres(
        await this.moviesRepository.findAll(),
        search.genres,
      );
    }

    return [await this.findOneRandom()];
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const allGenres = await this.genresService.findAll();
    const genres: Genre[] = [];

    for (const genre of createMovieDto.genres) {
      if (!allGenres.find((g) => g.name === genre)) {
        throw new DomainRuleBrokenError(`Genre ${genre} is invalid`);
      }

      genres.push({ name: genre });
    }

    const newMovie: Omit<Movie, 'id'> = {
      title: createMovieDto.title,
      year: createMovieDto.year,
      runtime: createMovieDto.runtime,
      genres,
      director: createMovieDto.director,
      actors: createMovieDto.actors,
      plot: createMovieDto.plot,
      posterUrl: createMovieDto.posterUrl,
    };

    return await this.moviesRepository.create(newMovie);
  }
}
