import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AllowAnonymous,
  OptionalAuth,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({
    description: 'Current user profile and session information.',
  })
  getProfile(@Session() session: UserSession) {
    return {
      user: session.user,
      session: session.session,
    };
  }

  @Get('public')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Public endpoint (no authentication required)' })
  @ApiOkResponse({
    description: 'Public route response.',
  })
  getPublic() {
    return { message: 'This is a public route' };
  }

  @Get('optional')
  @OptionalAuth()
  @ApiOperation({
    summary: 'Optional authentication endpoint',
    description: 'This endpoint works with or without authentication.',
  })
  @ApiOkResponse({
    description: 'Response indicating authentication status.',
  })
  getOptional(@Session() session?: UserSession) {
    return {
      authenticated: !!session,
      user: session?.user,
    };
  }
}
