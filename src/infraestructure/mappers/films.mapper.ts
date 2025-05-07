import { Film } from 'src/domain/entities/film.entity';
import { FilmDocument } from '../schemas/films.schema';

export class FilmMapper {
  static toPersistence(film: Film): Partial<FilmDocument> {
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

  static fromPersistance(doc: FilmDocument): Film {
    return new Film(
      {
        episodeId: doc.episode_id,
        title: doc.title,
        openingCrawl: doc.opening_crawl,
        director: doc.director,
        producer: doc.producer,
        releaseDate: doc.release_date,
        characters: doc.characters,
        planets: doc.planets,
        starships: doc.starships,
        vehicles: doc.vehicles,
        species: doc.species,
        url: doc.url,
        created: doc.created,
        edited: doc.edited,
      },
      doc._id,
    );
  }
}
