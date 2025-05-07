import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  app.enableCors({
    origin: '*',
    methods: ['OPTIONS', 'POST', 'PUT', 'PATCH', 'GET', 'DELETE'],
    allowedHeaders: '*',
    exposedHeaders: '*',
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}}`);
}
bootstrap();
