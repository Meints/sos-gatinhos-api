import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import type { EnvironmentVariables } from '../config/env.validation';
import { PrismaService } from '../database/prisma.service';
import { createAuthInstance } from './auth.factory';

const configService = new ConfigService<EnvironmentVariables, true>();
const prismaService = new PrismaService(configService);
const auth = createAuthInstance(prismaService, configService);

@Module({
  imports: [
    BetterAuthModule.forRoot({
      auth,
    }),
  ],
})
export class AuthModule {}
