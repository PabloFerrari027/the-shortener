import { ListingResponse } from 'src/shared/types/listing-response.type';
import { PaginationOptions } from 'src/shared/types/pagination-options.type';
import {
  ShortUrl,
  ShortUrlProps,
} from '../../domain/entities/short-url.entity';
import { ShortUrlRepository } from '../../domain/repositories/short-url.repository';
import { Prisma } from 'src/shared/infra/orm/prisma';

export class PrismaShortUrlRepository implements ShortUrlRepository {
  private readonly prisma: Prisma;

  constructor() {
    this.prisma = Prisma.getInstance();
  }

  async create(shortUrl: ShortUrl): Promise<void> {
    await this.prisma.pg().shortUrl.create({
      data: {
        clickCount: shortUrl.clickCount,
        createdAt: shortUrl.createdAt,
        hash: shortUrl.hash,
        id: shortUrl.id,
        url: shortUrl.url,
        updatedAt: shortUrl.updatedAt,
      },
    });
  }

  async findByHash(hash: string): Promise<ShortUrl | null> {
    const result = await this.prisma.pg().shortUrl.findUnique({
      where: { hash, removedAt: null },
    });

    if (!result) return null;

    return ShortUrl.fromJSON(
      {
        ...result,
        createdAt: result.createdAt.toJSON(),
        updatedAt: result.updatedAt.toJSON(),
      },
      'CAMEL_CASE',
    );
  }

  async findById(id: string): Promise<ShortUrl | null> {
    const result = await this.prisma.pg().shortUrl.findUnique({
      where: { id, removedAt: null },
    });

    if (!result) return null;

    return ShortUrl.fromJSON(
      {
        ...result,
        createdAt: result.createdAt.toJSON(),
        updatedAt: result.updatedAt.toJSON(),
      },
      'CAMEL_CASE',
    );
  }

  async list(
    options?: PaginationOptions<keyof ShortUrlProps>,
  ): Promise<ListingResponse<ShortUrl>> {
    const currentPage = options?.page ?? 1;
    const take = 100;
    const skip = (currentPage - 1) * 100;

    const result = await this.prisma.pg().shortUrl.findMany({
      where: { removedAt: null },
      skip,
      take,
    });

    const totalPages = await this.prisma.pg().shortUrl.count({
      where: { removedAt: null },
    });

    const data = result.map((i) =>
      ShortUrl.fromJSON(
        {
          ...i,
          createdAt: i.createdAt.toJSON(),
          updatedAt: i.updatedAt.toJSON(),
        },
        'CAMEL_CASE',
      ),
    );

    return { data, currentPage, totalPages };
  }

  async update(shortUrl: ShortUrl): Promise<void> {
    await this.prisma.pg().shortUrl.update({
      where: { id: shortUrl.id },
      data: {
        clickCount: shortUrl.clickCount,
        createdAt: shortUrl.createdAt,
        hash: shortUrl.hash,
        id: shortUrl.id,
        url: shortUrl.url,
        updatedAt: shortUrl.updatedAt,
      },
    });
  }

  async count(): Promise<number> {
    return await this.prisma.pg().shortUrl.count();
  }

  async delete(id: string): Promise<void> {
    await this.prisma.pg().shortUrl.update({
      where: { id },
      data: { removedAt: new Date() },
    });
  }
}
