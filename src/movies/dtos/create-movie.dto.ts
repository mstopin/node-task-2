export interface CreateMovieDto {
  genres: string[];
  title: string;
  year: number;
  runtime: number;
  director: string;
  actors?: string | undefined;
  plot?: string | undefined;
  posterUrl?: string | undefined;
}
