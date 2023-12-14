import { Genre } from 'genres/genre';
import { GenreRepository } from 'genres/genre.repository';
import { FileDatabaseGenreData } from './file-database.genre';
import { FileDatabaseRepository } from '../../common/file-database.repository';

export class FileDatabaseGenreRepository
  extends FileDatabaseRepository<FileDatabaseGenreData>
  implements GenreRepository
{
  constructor() {
    super();
  }

  private mapPersistenceToDomain(data: FileDatabaseGenreData): Genre[] {
    return data.genres.map((genre) => ({
      name: genre,
    }));
  }

  async findAll(): Promise<Genre[]> {
    const data = await this.readData();

    return this.mapPersistenceToDomain(data);
  }
}
