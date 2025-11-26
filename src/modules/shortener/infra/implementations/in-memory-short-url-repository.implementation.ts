/* eslint-disable @typescript-eslint/require-await */
import { ListingResponse } from 'src/shared/types/listing-response.type';
import { PaginationOptions } from 'src/shared/types/pagination-options.type';
import {
  ShortUrl,
  ShortUrlProps,
} from '../../domain/entities/short-url.entity';
import { ShortUrlRepository } from '../../domain/repositories/short-url.repository';
import { Sort } from 'src/shared/utils/sort.util';

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

  async findById(id: string): Promise<ShortUrl | null> {
    return this.items.find((i) => i.id === id) ?? null;
  }

  async list(
    options?: PaginationOptions<keyof ShortUrlProps>,
  ): Promise<ListingResponse<ShortUrl>> {
    const mappedItems = this.items.map((c) => c.toJSON('CAMEL_CASE'));

    const sortedItems = Sort.execute(
      mappedItems,
      options?.order ?? 'desc',
      options?.orderBy ?? 'createdAt',
    );

    const take = 1;
    const currentPage = options?.page ?? 1;
    const skip = take * (currentPage - 1);
    const paginatedItems = sortedItems.slice(skip, skip + take);
    const data = paginatedItems.map((c) => ShortUrl.fromJSON(c, 'CAMEL_CASE'));
    const totalPages = Math.ceil(this.items.length / take) || 1;
    return { totalPages, currentPage, data };
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
