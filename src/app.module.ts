import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShortenerModule } from './modules/shortener/shortener.module';
import { Env, NODE_ENV } from './shared/env';
import { PrismaShortUrlRepository } from './modules/shortener/infra/implementations/prisma-short-url-repository.implementation';
import { InMemoryShortUrlRepository } from './modules/shortener/infra/implementations/in-memory-short-url-repository.implementation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test.local' : '.env',
    }),
    ShortenerModule,
  ],
  providers: [
    {
      provide: 'ShortUrlRepository',
      useFactory() {
        switch (Env.NODE_ENV) {
          case NODE_ENV.DEVELOPMENT ||
            NODE_ENV.PRODUCTION ||
            NODE_ENV['TEST-E2E']:
            return new PrismaShortUrlRepository();
          case NODE_ENV['TEST-UNIT']:
            return new InMemoryShortUrlRepository();
        }
      },
    },
  ],
  exports: ['ShortUrlRepository'],
})
export class AppModule {}
