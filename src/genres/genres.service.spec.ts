import { Genre } from './genre';
import { GenresService } from './genres.service';
import { InMemoryGenreRepository } from './impl/in-memory.genres.repository';

const aGenre: () => Genre = () => ({
  name: 'Sci-Fi',
});

describe('GenresService', () => {
  let genresService: GenresService;

  beforeEach(() => {
    genresService = new GenresService(new InMemoryGenreRepository([aGenre()]));
  });

  describe('findAll', () => {
    it('should return all genres', async () => {
      const genres = await genresService.findAll();

      expect(genres).toStrictEqual([aGenre()]);
    });
  });
});
