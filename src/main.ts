import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './shared/env';
import { GlobalExceptionFilter } from './shared/infra/http/filter/global-exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(Env.PORT);
}
bootstrap();
