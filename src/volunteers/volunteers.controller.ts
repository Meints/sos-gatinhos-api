import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles, Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { UserRole } from '@prisma/client';
import { ApplyForVolunteerRoleUseCase } from './application/use-cases/apply-for-volunteer.use-case';
import { ListVolunteerApplicationsUseCase } from './application/use-cases/list-applications.use-case';
import { ApproveVolunteerApplicationUseCase } from './application/use-cases/approve-application.use-case';
import { RejectVolunteerApplicationUseCase } from './application/use-cases/reject-application.use-case';
import { ApplyVolunteerDto } from './dto/apply-volunteer.dto';

@ApiTags('Volunteers')
@ApiBearerAuth()
@Controller('volunteers')
export class VolunteersController {
  constructor(
    private readonly applyUseCase: ApplyForVolunteerRoleUseCase,
    private readonly listUseCase: ListVolunteerApplicationsUseCase,
    private readonly approveUseCase: ApproveVolunteerApplicationUseCase,
    private readonly rejectUseCase: RejectVolunteerApplicationUseCase,
  ) {}

  @Post('apply')
  @ApiOperation({ summary: 'Apply to become a volunteer' })
  @ApiResponse({
    status: 201,
    description: 'Application submitted successfully.',
  })
  @Roles([UserRole.ADOPTER]) // Any logged in user (Adopter is default)
  async apply(@Session() session: UserSession, @Body() dto: ApplyVolunteerDto) {
    return this.applyUseCase.execute(session.user.id, dto);
  }

  @Get('applications')
  @ApiOperation({ summary: 'List all volunteer applications' })
  @ApiResponse({ status: 200, description: 'List of applications.' })
  @Roles([UserRole.ADMIN])
  async list() {
    return this.listUseCase.execute();
  }

  @Patch('applications/:id/approve')
  @ApiOperation({ summary: 'Approve a volunteer application' })
  @ApiResponse({
    status: 200,
    description: 'Application approved and user role updated.',
  })
  @Roles([UserRole.ADMIN])
  async approve(@Param('id') id: string) {
    return this.approveUseCase.execute(id);
  }

  @Patch('applications/:id/reject')
  @ApiOperation({ summary: 'Reject a volunteer application' })
  @ApiResponse({ status: 200, description: 'Application rejected.' })
  @Roles([UserRole.ADMIN])
  async reject(@Param('id') id: string) {
    return this.rejectUseCase.execute(id);
  }
}
