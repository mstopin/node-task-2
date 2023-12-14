export interface FileDatabaseMovieData {
  movies: FileDatabaseMovie[];
}

export interface FileDatabaseMovie {
  id: number;
  title: string;
  year: string;
  runtime: string;
  genres: string[];
  director: string;
  actors: string | null;
  plot: string | null;
  posterUrl: string | null;
}
