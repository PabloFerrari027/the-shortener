import { Prisma } from 'src/shared/infra/orm/prisma';

const prisma = Prisma.getInstance().pg();

beforeEach(async () => {
  const tables = await prisma.$queryRawUnsafe<Array<{ tablename: string }>>(
    `SELECT tablename FROM pg_tables WHERE schemaname='public'`,
  );

  for (const { tablename } of tables) {
    if (tablename !== '_prisma_migrations') {
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE`,
      );
    }
  }
});
