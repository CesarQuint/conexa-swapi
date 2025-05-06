import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SwapiService } from 'src/domain/services/swapi.service';
import { FilmsRepository } from 'src/infraestructure/repositories/films.repository';

import {
  FilmModel,
  FilmSchema,
} from 'src/infraestructure/schemas/films.schema';
import { FilmSeeder } from 'src/infraestructure/seeders/film.seeder';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: FilmModel.name, schema: FilmSchema }]),
  ],
  controllers: [],
  providers: [FilmsRepository, SwapiService, FilmSeeder],
})
export class FilmsModule {}
