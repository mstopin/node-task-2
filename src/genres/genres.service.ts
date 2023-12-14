import { Inject, Service } from 'typedi';
import { Genre } from './genre';
import { GENRES_REPOSITORY, GenresRepository } from './genres.repository';

@Service()
export class GenresService {
  constructor(
    @Inject(GENRES_REPOSITORY)
    private readonly genresRepository: GenresRepository,
  ) {}

  async findAll(): Promise<Genre[]> {
    return await this.genresRepository.findAll();
  }
}
