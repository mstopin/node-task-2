import 'dotenv/config';

import { GenreService } from './genres/genre.service';
import { FileDatabaseGenreRepository } from './genres/impl/file-database.genre.repository';

(async function main() {
  const genreService = new GenreService(new FileDatabaseGenreRepository());

  console.log(await genreService.findAll());
})().catch(console.error);
