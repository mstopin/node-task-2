import { Genre } from 'genres/genre';
import { GenresService } from '../genres/genres.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { Movie } from './movie';
import { MoviesRepository } from './movies.repository';
import { DomainRuleBrokenError } from '../common/domain-rule-broken.error';

export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly genresService: GenresService,
  ) {}

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
