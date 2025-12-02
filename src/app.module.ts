import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './infrastructure/auth/auth.module';
import { validate } from './infrastructure/config/env.validation';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { CatModule } from './presentation/modules/cat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: ['.env'],
    }),
    PrismaModule,
    AuthModule,
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
