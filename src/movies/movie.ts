import { Genre } from '../genres/genre';

export interface Movie {
  id: number;
  title: string;
  year: number;
  runtime: number;
  genres: Genre[];
  director: string;
  actors?: string | undefined;
  plot?: string | undefined;
  posterUrl?: string | undefined;
}
