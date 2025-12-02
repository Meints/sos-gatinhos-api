import { Module } from '@nestjs/common';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { AuthService } from '../../infrastructure/auth/auth.service';

@Module({
  imports: [
    BetterAuthModule.forRootAsync({
      useFactory: (authService: AuthService) => ({
        auth: authService.getAuth(),
      }),
      inject: [AuthService],
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
