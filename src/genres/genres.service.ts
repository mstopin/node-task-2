import { Genre } from './genre';
import { GenresRepository } from './genres.repository';

export class GenresService {
  constructor(private readonly genresRepository: GenresRepository) {}

  async findAll(): Promise<Genre[]> {
    return await this.genresRepository.findAll();
  }
}
