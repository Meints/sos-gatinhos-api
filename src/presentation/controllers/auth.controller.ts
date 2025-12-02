import { Controller, Get } from '@nestjs/common';
import {
  AllowAnonymous,
  OptionalAuth,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';

@Controller('auth')
export class AuthController {
  @Get('me')
  getProfile(@Session() session: UserSession) {
    return {
      user: session.user,
      session: session.session,
    };
  }

  @Get('public')
  @AllowAnonymous()
  getPublic() {
    return { message: 'This is a public route' };
  }

  @Get('optional')
  @OptionalAuth()
  getOptional(@Session() session?: UserSession) {
    return {
      authenticated: !!session,
      user: session?.user,
    };
  }
}
