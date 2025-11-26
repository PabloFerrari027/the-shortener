import { ShortUrl } from '../../domain/entities/short-url.entity';
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
