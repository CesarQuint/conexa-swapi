import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FilmsService } from 'src/domain/services/films.service';
import { FilmsRepository } from 'src/infraestructure/repositories/films.repository';
import { CreateFilmDto } from 'src/interfaces/dto/create-film.request.dto';
import { UpdateFilmDto } from 'src/interfaces/dto/update-film.request.dto';
import { Film } from 'src/domain/entities/film.entity';
import { Types } from 'mongoose';

jest.mock('src/infraestructure/repositories/films.repository');

describe('FilmsService', () => {
  let service: FilmsService;
  let filmsRepository: jest.Mocked<FilmsRepository>;

  const filmMock = new Film(
    {
      episodeId: 1,
      title: 'A New Hope',
      openingCrawl: 'Text',
      director: 'George Lucas',
      producer: 'Gary Kurtz',
      releaseDate: '1977-05-25',
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      url: 'https://swapi.dev/api/films/1/',
      created: '1977-05-25',
      edited: '1977-05-25',
    },
    new Types.ObjectId(),
  );

  beforeEach(() => {
    filmsRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEpisode: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    service = new FilmsService(filmsRepository);
  });

  describe('getAllFilmsData', () => {
    it('should return an array of film response DTOs', async () => {
      filmsRepository.findAll.mockResolvedValue([filmMock]);

      const result = await service.getAllFilmsData();
      expect(result).toHaveLength(1);
      expect(result[0].props.title).toBe('A New Hope');
    });

    it('should throw NotFoundException if no films are found', async () => {
      filmsRepository.findAll.mockResolvedValue(null);

      await expect(service.getAllFilmsData()).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getFilmData', () => {
    it('should return a single film response DTO', async () => {
      filmsRepository.findById.mockResolvedValue(filmMock);

      const result = await service.getFilmData(filmMock.id.toString());
      expect(result.props.title).toBe('A New Hope');
    });

    it('should throw NotFoundException if film not found', async () => {
      filmsRepository.findById.mockResolvedValue(null);

      await expect(service.getFilmData(filmMock.id.toString())).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createFilm', () => {
    const dto: CreateFilmDto = {
      episodeId: 1,
      title: 'A New Hope',
      openingCrawl: 'Text',
      director: 'George Lucas',
      producer: 'Gary Kurtz',
      releaseDate: '1977-05-25',
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      url: 'https://swapi.dev/api/films/1/',
      created: '1977-05-25',
      edited: '1977-05-25',
    };

    it('should throw UnprocessableEntityException if film with episode exists', async () => {
      filmsRepository.findByEpisode.mockResolvedValue(filmMock);

      await expect(service.createFilm(dto)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });

    it('should throw NotFoundException if film is not saved properly', async () => {
      filmsRepository.findByEpisode.mockResolvedValue(null);
      filmsRepository.save.mockResolvedValue(undefined);
      filmsRepository.findById.mockResolvedValue(null);

      await expect(service.createFilm(dto)).rejects.toThrow(NotFoundException);
    });

    it('should create and return film response DTO', async () => {
      filmsRepository.findByEpisode.mockResolvedValue(null);
      filmsRepository.save.mockResolvedValue(undefined);
      filmsRepository.findById.mockResolvedValue(filmMock);

      const result = await service.createFilm(dto);
      expect(result.props.title).toBe('A New Hope');
    });
  });

  describe('updateFilm', () => {
    const updateDto: UpdateFilmDto = {
      title: 'Updated Title',
      created: '',
      edited: '',
    };

    it('should throw NotFoundException if film not found', async () => {
      filmsRepository.findById.mockResolvedValue(null);

      await expect(
        service.updateFilm(filmMock.id.toString(), updateDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should update and return updated film response DTO', async () => {
      filmsRepository.findById.mockResolvedValueOnce(filmMock);
      filmsRepository.save.mockResolvedValue(undefined);
      filmsRepository.findById.mockResolvedValueOnce(filmMock);

      const result = await service.updateFilm(
        filmMock.id.toString(),
        updateDto,
      );
      expect(result.props.title).toBe('A New Hope');
    });
  });

  describe('deleteFilm', () => {
    it('should call delete with correct ID', async () => {
      const id = new Types.ObjectId().toString();
      await service.deleteFilm(id);
      expect(filmsRepository.delete).toHaveBeenCalled();
    });
  });
});
