import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import type { PrismaService } from '../../prisma/prisma.service';

export function createAuth(prisma: PrismaService) {
  return betterAuth({
    basePath: '/api/auth',
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    emailAndPassword: {
      enabled: true,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
    },
    // CORS is handled globally in main.ts (all origins allowed)
  });
}
