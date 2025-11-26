import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient as PGPrismaClient } from '../../../../../.prisma/pg/client';
import { Env } from 'src/shared/env';

export class Prisma {
  private static instance: Prisma;
  private pgClient: PGPrismaClient | null = null;

  private constructor() {}

  static getInstance(): Prisma {
    if (!Prisma.instance) Prisma.instance = new Prisma();
    return Prisma.instance;
  }

  pg(): PGPrismaClient {
    if (this.pgClient) return this.pgClient;

    const connectionString = Env.PG_URL;
    const adapter = new PrismaPg({ connectionString });
    this.pgClient = new PGPrismaClient({ adapter });
    return this.pgClient;
  }
}
