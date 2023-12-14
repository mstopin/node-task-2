import { Genre } from './genre';

export interface GenresRepository {
  findAll(): Promise<Genre[]>;
}
