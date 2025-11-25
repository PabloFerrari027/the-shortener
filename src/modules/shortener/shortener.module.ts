import { Module } from '@nestjs/common';
import { ShortenerController } from './application/shortener.controller';
import { CreateShortUrlService } from './application/services/create-short-url.service';
import { HandleShortUrlService } from './application/services/handle-short-url.service';

@Module({
  controllers: [ShortenerController],
  providers: [CreateShortUrlService, HandleShortUrlService],
})
export class ShortenerModule {}
