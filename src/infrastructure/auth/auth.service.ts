import { Injectable } from "@nestjs/common";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class AuthService {
  private readonly prisma: PrismaClient;
  private authInstance;

  constructor() {
    this.prisma = new PrismaClient();
    this.authInstance = betterAuth({
      database: prismaAdapter(this.prisma, {
        provider: "postgresql",
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

  getAuth() {
    return this.authInstance;
  }
}

