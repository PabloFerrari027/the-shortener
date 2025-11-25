/* eslint-disable @typescript-eslint/require-await */
import { ShortUrl } from '../../domain/entities/short-url.entity';
import { ShortUrlRepository } from '../../domain/repositories/short-url.repository';

export class InMemoryShortUrlRepository implements ShortUrlRepository {
  private items: Array<ShortUrl>;

  constructor() {
    this.items = [];
  }

  async create(shortUrl: ShortUrl): Promise<void> {
    this.items.push(shortUrl);
  }

  async findByHash(hash: string): Promise<ShortUrl | null> {
    return this.items.find((i) => i.hash === hash) ?? null;
  }

  async update(shortUrl: ShortUrl): Promise<void> {
    this.items = this.items.map((i) => (i.id === shortUrl.id ? shortUrl : i));
  }

  async count(): Promise<number> {
    return this.items.length;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((i) => i.id !== id);
  }
}
