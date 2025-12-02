import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import type { EnvironmentVariables } from '../config/env.validation';
import { PrismaService } from '../database/prisma.service';

export function createAuthInstance(
  prismaService: PrismaService,
  configService: ConfigService<EnvironmentVariables, true>,
) {
  return betterAuth({
    database: prismaAdapter(prismaService, {
      provider: 'postgresql',
    }),
    secret: configService.get<string>('BETTER_AUTH_SECRET'),
    baseURL: configService.get<string>('BETTER_AUTH_URL'),
    basePath: configService.get<string>('BETTER_AUTH_BASE_PATH') || '/api/auth',
  });
}
