import { Movie } from './movie';
import { MoviesService } from './movies.service';
import { GenresService } from '../genres/genres.service';
import { InMemoryMoviesRepository } from './impl/in-memory.movies.repository';
import { InMemoryGenreRepository } from '../genres/impl/in-memory.genres.repository';
import { DomainRuleBrokenError } from '../common/domain-rule-broken.error';

const aBiographyMovie: () => Movie = () => ({
  id: 1,
  title: 'title-1',
  year: 2023,
  runtime: 100,
  genres: [{ name: 'Biography' }],
  director: 'director-1',
});

const aComedyMovie: () => Movie = () => ({
  id: 2,
  title: 'title-2',
  year: 2024,
  runtime: 125,
  genres: [{ name: 'Comedy' }],
  director: 'director-2',
});

const aBiographyComedyMovie: () => Movie = () => ({
  id: 3,
  title: 'title-3',
  year: 2025,
  runtime: 132,
  genres: [{ name: 'Biography' }, { name: 'Comedy' }],
  director: 'director-3',
});

const aHorrorMovie: () => Movie = () => ({
  id: 5,
  title: 'title-5',
  year: 2030,
  runtime: 50,
  genres: [{ name: 'Horror' }],
  director: 'director-4',
});

describe('MoviesService', () => {
  let moviesRepository: InMemoryMoviesRepository;
  let moviesService: MoviesService;

  beforeEach(() => {
    moviesRepository = new InMemoryMoviesRepository([
      aBiographyMovie(),
      aComedyMovie(),
      aBiographyComedyMovie(),
      aHorrorMovie(),
    ]);

    moviesService = new MoviesService(
      moviesRepository,
      new GenresService(
        new InMemoryGenreRepository([
          {
            name: 'Biography',
          },
          { name: 'Comedy' },
        ]),
      ),
    );
  });

  describe('find', () => {
    it('should find random movie', async () => {
      const movies = await moviesService.find({});

      expect(movies).toStrictEqual([moviesRepository.movies[0]]);
    });

    it('should find movies with duration +- 10', async () => {
      const movies = await moviesService.find({ duration: 123 });

      expect(movies).toStrictEqual([aComedyMovie(), aBiographyComedyMovie()]);
    });

    it('should find and sort movies with specified genres', async () => {
      const movies = await moviesService.find({
        genres: ['Biography', 'Comedy'],
      });

      expect(movies).toStrictEqual([
        aBiographyComedyMovie(),
        aBiographyMovie(),
        aComedyMovie(),
      ]);
    });
  });

  describe('create', () => {
    it('should create movie with valid genre', async () => {
      await moviesService.create({
        title: 'title-4',
        year: 2026,
        runtime: 175,
        director: 'director-4',
        genres: ['Comedy'],
      });

      expect(moviesRepository.movies.length).toBe(5);
      expect(moviesRepository.movies[4]?.title).toBe('title-4');
    });

    it('should throw when created movie has invalid genre', async () => {
      await expect(async () => {
        await moviesService.create({
          title: 'title-5',
          year: 2026,
          runtime: 175,
          director: 'director-4',
          genres: ['Sci-Fi'],
        });
      }).rejects.toThrow(new DomainRuleBrokenError('Genre Sci-Fi is invalid'));
    });
  });
});
