import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { FilmSeeder } from './infraestructure/seeders/film.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const filmSeeder = app.get(FilmSeeder);

  try {
    await filmSeeder.load();
  } catch (error) {
    throw error;
  } finally {
    await app.close();
  }
}
bootstrap();
