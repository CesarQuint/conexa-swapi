import { FilmResponseDto } from 'src/interfaces/dto/get-all-films.response.dto';
import { Film } from '../entities/film.entity';

export class FilmsServiceMapper {
  static toResponse(film: Film): FilmResponseDto {
    return {
      id: film.id.toString(),
      props: {
        episodeId: film.episodeId,
        title: film.title,
        openingCrawl: film.openingCrawl,
        director: film.director,
        producer: film.producer,
        releaseDate: film.releaseDate,
        characters: film.characters,
        planets: film.planets,
        starships: film.starships,
        vehicles: film.vehicles,
        species: film.species,
        url: film.url,
        created: film.created,
        edited: film.edited,
      },
    };
  }
}
