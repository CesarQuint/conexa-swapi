import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { FilmsRepository } from 'src/infraestructure/repositories/films.repository';
import { CreateFilmDto } from 'src/interfaces/dto/create-film.request.dto';
import { UpdateFilmDto } from 'src/interfaces/dto/update-film.request.dto';
import { Film } from '../entities/film.entity';
import { FilmResponseDto } from 'src/interfaces/dto/get-all-films.response.dto';
import { FilmsServiceMapper } from '../mappers/films-service.mapper';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getAllFilmsData(): Promise<FilmResponseDto[]> {
    const films = await this.filmsRepository.findAll();
    if (!films) throw new NotFoundException('Not films found.');

    return films.map((film) => FilmsServiceMapper.toResponse(film));
  }

  async getFilmData(filmId: string): Promise<FilmResponseDto> {
    const FilmId = new Types.ObjectId(filmId);
    const film = await this.filmsRepository.findById(FilmId);
    if (!film) throw new NotFoundException('Film not found.');

    return FilmsServiceMapper.toResponse(film);
  }

  async createFilm(createFilmDto: CreateFilmDto): Promise<FilmResponseDto> {
    const film = await this.filmsRepository.findByEpisode(
      createFilmDto.episodeId,
    );

    if (film)
      throw new UnprocessableEntityException(
        "There's already a film for that chapter.",
      );

    const newFilm = new Film({ ...createFilmDto });

    await this.filmsRepository.save(newFilm);

    const filmCreated = await this.filmsRepository.findById(newFilm.id);

    if (!filmCreated) throw new NotFoundException('Film not found ');

    return FilmsServiceMapper.toResponse(filmCreated);
  }

  async updateFilm(
    filmId: string,
    updateFilmDto: UpdateFilmDto,
  ): Promise<FilmResponseDto> {
    const FilmId = new Types.ObjectId(filmId);
    const film = await this.filmsRepository.findById(FilmId);

    if (!film) throw new NotFoundException('Film not found.');

    const newFilm = new Film(
      {
        episodeId: updateFilmDto.episodeId ?? film.episodeId,
        title: updateFilmDto.title ?? film.title,
        openingCrawl: updateFilmDto.openingCrawl ?? film.openingCrawl,
        director: updateFilmDto.director ?? film.director,
        producer: updateFilmDto.producer ?? film.producer,
        releaseDate: updateFilmDto.releaseDate ?? film.releaseDate,
        characters: updateFilmDto.characters ?? film.characters,
        planets: updateFilmDto.planets ?? film.planets,
        starships: updateFilmDto.starships ?? film.starships,
        vehicles: updateFilmDto.vehicles ?? film.vehicles,
        species: updateFilmDto.species ?? film.species,
        url: updateFilmDto.url ?? film.url,
        created: updateFilmDto.created ?? film.created,
        edited: updateFilmDto.edited ?? film.edited,
      },
      film.id,
    );

    await this.filmsRepository.save(newFilm);

    const filmCreated = await this.filmsRepository.findById(newFilm.id);

    if (!filmCreated) throw new NotFoundException('Film not found ');

    return FilmsServiceMapper.toResponse(filmCreated);
  }

  async deleteFilm(filmId: string) {
    const FilId = new Types.ObjectId(filmId);
    await this.filmsRepository.delete(FilId);
  }
}
