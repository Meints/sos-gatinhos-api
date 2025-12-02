import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

// This file is used by Better Auth CLI for schema generation
// The actual auth instance for NestJS is created in infrastructure/auth/auth.module.ts
const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  secret: process.env.BETTER_AUTH_SECRET || 'change-me-in-production',
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: process.env.BETTER_AUTH_BASE_PATH || '/api/auth',
});
