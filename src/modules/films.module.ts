import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  FilmModel,
  FilmSchema,
} from 'src/infraestructure/schemas/films.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FilmModel.name, schema: FilmSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class FilmsModule {}
