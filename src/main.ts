import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './shared/env';
import { GlobalExceptionFilter } from './shared/infra/http/filter/global-exeption.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(Env.PORT);
}
bootstrap();
