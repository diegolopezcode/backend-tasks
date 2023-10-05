import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // habilita o cors para todas as rotas
  app.setGlobalPrefix('api'); // seta o prefixo para todas as rotas
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8888);
}
bootstrap();
