import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  Session,
  UserSession,
  AllowAnonymous,
  OptionalAuth,
} from '@thallesp/nestjs-better-auth';

@ApiTags('users')
@Controller('users')
export class UserController {
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  async getProfile(@Session() session: UserSession) {
    return { user: session.user };
  }

  @Get('public')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Public endpoint' })
  @ApiResponse({ status: 200, description: 'Public route' })
  async getPublic() {
    return { message: 'Public route' };
  }

  @Get('optional')
  @OptionalAuth()
  @ApiOperation({ summary: 'Optional auth endpoint' })
  @ApiResponse({ status: 200, description: 'Optional auth route' })
  async getOptional(@Session() session: UserSession) {
    return { authenticated: !!session };
  }
}
