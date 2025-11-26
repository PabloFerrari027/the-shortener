import { Env } from 'src/shared/env';
import { ShortUrl, ShortUrlJSON } from '../../domain/entities/short-url.entity';

export type ToControllerOut = ShortUrlJSON<'SNAKE_CASE'> & {
  short_url: string;
};

export class ShortUrlPresentation {
  static toController(shortUrl: ShortUrl): ToControllerOut {
    const output = {
      ...shortUrl.toJSON('SNAKE_CASE'),
      short_url: `${Env.APP_URL}/${shortUrl.hash}`,
    };

    return output;
  }
}
