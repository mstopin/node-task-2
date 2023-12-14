import { Genre } from './genre';
import { GenreRepository } from './genre.repository';

export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}

  async findAll(): Promise<Genre[]> {
    return await this.genreRepository.findAll();
  }
}
