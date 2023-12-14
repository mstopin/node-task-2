import { Genre } from '../genre';
import { GenresRepository } from '../genres.repository';

export class InMemoryGenreRepository implements GenresRepository {
  constructor(public readonly genres: Genre[]) {}

  findAll(): Promise<Genre[]> {
    return Promise.resolve(this.genres);
  }
}
