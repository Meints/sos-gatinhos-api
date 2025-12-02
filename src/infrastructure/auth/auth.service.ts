import { Injectable } from '@nestjs/common';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  private authInstance: ReturnType<typeof betterAuth>;

  constructor(private readonly prisma: PrismaService) {
    this.authInstance = betterAuth({
      database: prismaAdapter(this.prisma, {
        provider: 'postgresql',
      }),
      emailAndPassword: {
        enabled: true,
      },
      session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
      },
    });
  }

  getAuth(): ReturnType<typeof betterAuth> {
    return this.authInstance;
  }
}
