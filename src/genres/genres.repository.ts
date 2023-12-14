import { Genre } from './genre';

export const GENRES_REPOSITORY = 'GenresRepository';

export interface GenresRepository {
  findAll(): Promise<Genre[]>;
}
