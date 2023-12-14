import { Genre } from './genre';

export interface GenreRepository {
  findAll(): Promise<Genre[]>;
}
