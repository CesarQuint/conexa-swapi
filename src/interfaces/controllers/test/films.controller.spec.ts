import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from 'src/interfaces/controllers/films.controller';
import { FilmsService } from 'src/domain/services/films.service';
import { FilmResponseDto } from 'src/interfaces/dto/get-all-films.response.dto';
import { CreateFilmDto } from 'src/interfaces/dto/create-film.request.dto';
import { UpdateFilmDto } from 'src/interfaces/dto/update-film.request.dto';
import { RolesGuard } from 'src/infraestructure/guards/role.guard';
import { NotFoundException } from '@nestjs/common';

const result: FilmResponseDto[] = [
  {
    id: '1',
    props: {
      episodeId: 4,
      title: '',
      openingCrawl: '...',
      director: '',
      producer: '',
      releaseDate: '',
      characters: [''],
      planets: [''],
      starships: [''],
      vehicles: [''],
      species: [''],
      url: '',
      created: '',
      edited: '',
    },
  },
];

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  const mockFilmsService = {
    getAllFilmsData: jest.fn(),
    getFilmData: jest.fn(),
    createFilm: jest.fn(),
    updateFilm: jest.fn(),
    deleteFilm: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllFilms', () => {
    it('should return an array of films', async () => {
      mockFilmsService.getAllFilmsData.mockResolvedValue(result);

      expect(await controller.getAllFilms()).toBe(result);
    });

    it('should throw NotFoundException if no films are found', async () => {
      mockFilmsService.getAllFilmsData.mockRejectedValue(
        new NotFoundException('No films found'),
      );

      await expect(controller.getAllFilms()).rejects.toThrow(NotFoundException);
    });
  });

  describe('getFilm', () => {
    it('should return a specific film by ID', async () => {
      const filmId = '1';
      mockFilmsService.getFilmData.mockResolvedValue(result);

      expect(await controller.getFilm(filmId)).toBe(result);
    });

    it('should throw NotFoundException if the film is not found', async () => {
      const filmId = '1';
      mockFilmsService.getFilmData.mockRejectedValue(
        new NotFoundException('Film not found'),
      );

      await expect(controller.getFilm(filmId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createFilm', () => {
    it('should create and return a new film', async () => {
      const createFilmDto: CreateFilmDto = {
        title: 'New Film',
        episodeId: 4,
        openingCrawl: '...',
        director: '',
        producer: '',
        releaseDate: '',
        characters: [''],
        planets: [''],
        starships: [''],
        vehicles: [''],
        species: [''],
        url: '',
        created: '',
        edited: '',
      };
      const result: FilmResponseDto = {
        id: '2',
        props: {
          episodeId: 4,
          title: '',
          openingCrawl: '...',
          director: '',
          producer: '',
          releaseDate: '',
          characters: [''],
          planets: [''],
          starships: [''],
          vehicles: [''],
          species: [''],
          url: '',
          created: '',
          edited: '',
        },
      };
      mockFilmsService.createFilm.mockResolvedValue(result);

      expect(await controller.createFilm(createFilmDto)).toBe(result);
    });
  });

  describe('updateFilm', () => {
    it('should update and return the updated film', async () => {
      const filmId = '1';
      const updateFilmDto: UpdateFilmDto = {
        title: 'Updated Film',
        created: '',
        edited: '',
      };
      mockFilmsService.updateFilm.mockResolvedValue(result);

      expect(await controller.updateFilm(filmId, updateFilmDto)).toBe(result);
    });

    it('should throw NotFoundException if the film to update is not found', async () => {
      const filmId = '1';
      const updateFilmDto: UpdateFilmDto = {
        title: 'Updated Film',
        created: '',
        edited: '',
      };

      mockFilmsService.updateFilm.mockRejectedValue(
        new NotFoundException('Film not found'),
      );

      await expect(
        controller.updateFilm(filmId, updateFilmDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteFilm', () => {
    it('should delete the film and return void', async () => {
      const filmId = '1';
      mockFilmsService.deleteFilm.mockResolvedValue(undefined);

      await expect(controller.deleteFilm(filmId)).resolves.toBeUndefined();
    });
  });
});
