import { Genre } from 'genres/genre';
import { GenresRepository } from '../genres.repository';
import { FileDatabaseGenresData } from './file-database.genre';
import { FileDatabaseRepository } from '../../common/file-database.repository';

export class FileDatabaseGenresRepository
  extends FileDatabaseRepository<FileDatabaseGenresData>
  implements GenresRepository
{
  constructor() {
    super();
  }

  private mapPersistenceToDomain(data: FileDatabaseGenresData): Genre[] {
    return data.genres.map((genre) => ({
      name: genre,
    }));
  }

  async findAll(): Promise<Genre[]> {
    const data = await this.readData();

    return this.mapPersistenceToDomain(data);
  }
}
