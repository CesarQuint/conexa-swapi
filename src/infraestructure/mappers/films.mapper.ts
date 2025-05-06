import { Film } from 'src/domain/entities/film.entity';
import { FilmDocument } from '../schemas/films.schema';

export class FilmMapper {
  static toPersistance(film: Film): Partial<FilmDocument> {
    return {
      _id: film.id,
      episode_id: film.episodeId,
      title: film.title,
      opening_crawl: film.openingCrawl,
      director: film.director,
      producer: film.producer,
      release_date: film.releaseDate,
      characters: film.characters,
      planets: film.planets,
      starships: film.starships,
      vehicles: film.vehicles,
      species: film.species,
      url: film.url,
      created: film.created,
      edited: film.edited,
    };
  }
}
