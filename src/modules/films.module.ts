import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsService } from 'src/domain/services/films.service';
import { FilmsSyncService } from 'src/domain/services/films.sync.service';
import { SwapiService } from 'src/domain/services/swapi.service';
import { FilmsRepository } from 'src/infraestructure/repositories/films.repository';

import {
  FilmModel,
  FilmSchema,
} from 'src/infraestructure/schemas/films.schema';
import { FilmSeeder } from 'src/infraestructure/seeders/film.seeder';
import { FilmsController } from 'src/interfaces/controllers/films.controller';
import { JwtMiddleware } from 'src/middlewares/authentication.middleware';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: FilmModel.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [
    FilmsRepository,
    SwapiService,
    FilmSeeder,
    FilmsService,
    FilmsSyncService,
  ],
})
export class FilmsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(JwtMiddleware).forRoutes(FilmsController);
  }
}
