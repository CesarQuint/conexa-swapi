import { Test, TestingModule } from '@nestjs/testing';
import { SwapiService } from '../swapi.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Film } from 'src/domain/entities/film.entity';
import { AxiosHeaders } from 'axios';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpService: HttpService;

  const mockFilmData = {
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: 'It is a period of civil war...',
    director: 'George Lucas',
    producer: 'Gary Kurtz',
    release_date: '1977-05-25',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '1977-05-25',
    edited: '1977-05-25',
    url: 'https://swapi.dev/api/films/1/',
  };

  const mockSwapiResponse: AxiosResponse = {
    data: {
      count: 1,
      next: null,
      previous: null,
      results: [mockFilmData],
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {
      headers: new AxiosHeaders(),
      url: 'https://swapi.dev/api/films',
      method: 'get',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwapiService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('https://swapi.dev/api/films'),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockReturnValue(of(mockSwapiResponse)),
          },
        },
      ],
    }).compile();

    service = module.get<SwapiService>(SwapiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch and map all films correctly', async () => {
    const result = await service.getAllFilms();

    expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/films');
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(Film);
    expect(result[0].title).toBe('A New Hope');
    expect(result[0].episodeId).toBe(4);
    expect(result[0].openingCrawl).toBe('It is a period of civil war...');
  });
});
