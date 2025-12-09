import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { customSession } from 'better-auth/plugins';
import type { EnvironmentVariables } from '../config/env.validation';
import { PrismaService } from '../database/prisma.service';

const DEFAULT_ROLE = 'ADOPTER';

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
    plugins: [
      customSession(async (session) => {
        if (!session) return session;
        const userWithRole = session.user as typeof session.user & {
          role?: string | string[];
        };
        return {
          ...session,
          user: {
            ...session.user,
            role: userWithRole.role ?? DEFAULT_ROLE,
          },
        };
      }),
    ],
  });
}
