import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import { Film } from '../entities/film.entity';

export interface FilmResult {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiFilmResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: FilmResult[];
}

@Injectable()
export class SwapiService {
  private SWAPI_URL: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.SWAPI_URL = this.configService.get<string>('SWAPI_URL')!;
  }

  async getAllFilms() {
    let films: Film[] = [];

    const { data } = await firstValueFrom(
      this.httpService.get<SwapiFilmResponse>(this.SWAPI_URL).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    for (const element of data.results) {
      const film = new Film({
        ...element,
        episodeId: element.episode_id,
        openingCrawl: element.opening_crawl,
        releaseDate: element.release_date,
      });

      films.push(film);
    }

    return films;
  }
}
