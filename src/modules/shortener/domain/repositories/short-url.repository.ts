import { ShortUrl } from '../entities/short-url.entity';

export interface ShortUrlRepository {
  create(shortUrl: ShortUrl): Promise<void>;
  findByHash(hash: string): Promise<ShortUrl | null>;
  findById(id: string): Promise<ShortUrl | null>;
  update(shortUrl: ShortUrl): Promise<void>;
  count(): Promise<number>;
  delete(id: string): Promise<void>;
}
