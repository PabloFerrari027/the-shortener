import { Module } from '@nestjs/common';
import { ShortenerController } from './application/shortener.controller';
import { CreateShortUrlService } from './application/services/create-short-url.service';
import { HandleShortUrlService } from './application/services/handle-short-url.service';
import { ListShortnerUrlsService } from './application/services/list-shortner-urls.service';

@Module({
  controllers: [ShortenerController],
  providers: [
    CreateShortUrlService,
    HandleShortUrlService,
    ListShortnerUrlsService,
  ],
})
export class ShortenerModule {}
