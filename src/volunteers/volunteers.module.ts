import { Module } from '@nestjs/common';
import { VolunteersController } from './volunteers.controller';
import { ApplyForVolunteerRoleUseCase } from './application/use-cases/apply-for-volunteer.use-case';
import { ListVolunteerApplicationsUseCase } from './application/use-cases/list-applications.use-case';
import { ApproveVolunteerApplicationUseCase } from './application/use-cases/approve-application.use-case';
import { RejectVolunteerApplicationUseCase } from './application/use-cases/reject-application.use-case';
import { PrismaVolunteerRepository } from './infrastructure/persistence/prisma-volunteer.repository';
import { VolunteerRepository } from './domain/ports/volunteer.repository';
import { PrismaModule } from '../infrastructure/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VolunteersController],
  providers: [
    ApplyForVolunteerRoleUseCase,
    ListVolunteerApplicationsUseCase,
    ApproveVolunteerApplicationUseCase,
    RejectVolunteerApplicationUseCase,
    {
      provide: VolunteerRepository,
      useClass: PrismaVolunteerRepository,
    },
  ],
})
export class VolunteersModule {}
