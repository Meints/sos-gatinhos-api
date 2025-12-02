import { Module } from '@nestjs/common';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { PrismaService } from '../../prisma/prisma.service';
import { createAuth } from '../../infrastructure/auth/auth';

@Module({
  imports: [
    BetterAuthModule.forRootAsync({
      useFactory: (prisma: PrismaService) => ({
        auth: createAuth(prisma),
        disableTrustedOriginsCors: true, // Allow all origins - CORS handled by main.ts
      }),
      inject: [PrismaService],
    }),
  ],
})
export class AuthModule {}
