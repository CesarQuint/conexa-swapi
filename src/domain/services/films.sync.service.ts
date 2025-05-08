import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FilmSeeder } from 'src/infraestructure/seeders/film.seeder';

@Injectable()
export class FilmsSyncService {
  constructor(private readonly filmSeeder: FilmSeeder) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async syncFilms() {
    await this.filmSeeder.load();
    console.log('Films synced!');
  }
}
