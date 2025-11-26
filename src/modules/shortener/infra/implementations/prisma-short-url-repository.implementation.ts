import { ListingResponse } from 'src/shared/types/listing-response.type';
import { PaginationOptions } from 'src/shared/types/pagination-options.type';
import {
  ShortUrl,
  ShortUrlProps,
} from '../../domain/entities/short-url.entity';
import { ShortUrlRepository } from '../../domain/repositories/short-url.repository';

export class PrismaShortUrlRepository implements ShortUrlRepository {
  create(shortUrl: ShortUrl): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByHash(hash: string): Promise<ShortUrl | null> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<ShortUrl | null> {
    throw new Error('Method not implemented.');
  }
  list(
    options?: PaginationOptions<keyof ShortUrlProps>,
  ): Promise<ListingResponse<ShortUrl>> {
    throw new Error('Method not implemented.');
  }
  update(shortUrl: ShortUrl): Promise<void> {
    throw new Error('Method not implemented.');
  }
  count(): Promise<number> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
