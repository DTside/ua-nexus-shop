// src/lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Будем видеть запросы к базе в терминале
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;