import { Genre } from 'genres/genre';
import { GenreRepository } from 'genres/genre.repository';
import { FileGenre } from './file-database.genre';
import { FileDatabaseRepository } from '../../common/file-database.repository';

export class FileDatabaseGenreRepository
  extends FileDatabaseRepository<FileGenre>
  implements GenreRepository
{
  constructor() {
    super();
  }

  private mapPersistenceToDomain(fileGenre: FileGenre): Genre[] {
    return fileGenre.genres.map((g) => ({
      name: g,
    }));
  }

  async findAll(): Promise<Genre[]> {
    const data = await this.readData();

    return this.mapPersistenceToDomain(data);
  }
}
