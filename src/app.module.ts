import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './presentation/modules/auth.module';
import { CatModule } from './presentation/modules/cat.module';
import { UserModule } from './presentation/modules/user.module';

@Module({
  imports: [PrismaModule, AuthModule, CatModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
