import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repositories/films.repository';
import { SwapiService } from 'src/domain/services/swapi.service';

@Injectable()
export class FilmSeeder {
  constructor(
    private readonly repository: FilmsRepository,
    private readonly swapyService: SwapiService,
  ) {}

  async load() {
    const films = await this.swapyService.getAllFilms();
    await this.repository.saveMany(films);
    console.log('Data Loaded Successfully');
  }
}
