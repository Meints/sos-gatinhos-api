import { Injectable, NotFoundException } from '@nestjs/common';
import { VolunteerRepository } from '../../domain/ports/volunteer.repository';
import { VolunteerApplication } from '../../domain/entities/volunteer-application.entity';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class ApproveVolunteerApplicationUseCase {
  constructor(
    private readonly volunteerRepository: VolunteerRepository,
    private readonly prisma: PrismaService, // Needed to update User role
  ) {}

  async execute(id: string): Promise<VolunteerApplication> {
    const application = await this.volunteerRepository.findById(id);
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    // Transaction to ensure both happen or neither
    return this.prisma.$transaction(async (tx) => {
      // 1. Update Application Status
      const updatedApp = await tx.volunteerApplication.update({
        where: { id },
        data: { status: 'APPROVED' },
      });

      // 2. Update User Role
      await tx.user.update({
        where: { id: application.userId },
        data: { role: UserRole.VOLUNTEER },
      });

      return new VolunteerApplication(
        updatedApp.id,
        updatedApp.userId,
        updatedApp.status,
        updatedApp.motivation,
        updatedApp.availability,
        updatedApp.linkedinProfile,
        updatedApp.phone,
        updatedApp.notes,
        updatedApp.createdAt,
        updatedApp.updatedAt,
      );
    });
  }
}
