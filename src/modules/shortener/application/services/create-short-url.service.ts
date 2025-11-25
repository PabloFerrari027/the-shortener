import type { ShortUrlRepository } from '../../domain/repositories/short-url.repository';
import { Inject, Injectable } from '@nestjs/common';
import { ShortUrl } from '../../domain/entities/short-url.entity';
import { Env } from 'src/shared/env';

type Input = { url: string };
type Output = { shortUrl: string };

@Injectable()
export class CreateShortUrlService {
  constructor(
    @Inject('ShortUrlRepository')
    protected readonly shortUrlRepository: ShortUrlRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const count = await this.shortUrlRepository.count();
    const hash = ShortUrl.generateHash(count + 1);

    await this.shortUrlRepository.create(
      ShortUrl.create({
        hash,
        url: input.url,
      }),
    );

    const shortUrl = `${Env.APP_URL}/${hash}`;

    return { shortUrl };
  }
}
