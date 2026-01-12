import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { VolunteerRepository } from '../../domain/ports/volunteer.repository';
import { VolunteerApplication } from '../../domain/entities/volunteer-application.entity';
import {
  ApplicationStatus,
  VolunteerApplication as PrismaApplication,
} from '@prisma/client';

@Injectable()
export class PrismaVolunteerRepository implements VolunteerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    userId: string;
    motivation: string;
    availability: string;
    linkedinProfile?: string | null;
    phone: string;
  }): Promise<VolunteerApplication> {
    const created = await this.prisma.volunteerApplication.create({
      data: {
        userId: data.userId,
        motivation: data.motivation,
        availability: data.availability,
        linkedinProfile: data.linkedinProfile,
        phone: data.phone,
        status: ApplicationStatus.PENDING,
      },
    });
    return this.mapToDomain(created);
  }

  async findAll(): Promise<VolunteerApplication[]> {
    const applications = await this.prisma.volunteerApplication.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return applications.map((app) => this.mapToDomain(app));
  }

  async findById(id: string): Promise<VolunteerApplication | null> {
    const application = await this.prisma.volunteerApplication.findUnique({
      where: { id },
    });
    return application ? this.mapToDomain(application) : null;
  }

  async updateStatus(
    id: string,
    status: 'APPROVED' | 'REJECTED',
  ): Promise<VolunteerApplication> {
    const updated = await this.prisma.volunteerApplication.update({
      where: { id },
      data: {
        status: ApplicationStatus[status],
        updatedAt: new Date(),
      },
    });
    return this.mapToDomain(updated);
  }

  async findByUserId(userId: string): Promise<VolunteerApplication | null> {
    const application = await this.prisma.volunteerApplication.findFirst({
      where: { userId },
    });
    return application ? this.mapToDomain(application) : null;
  }

  private mapToDomain(prismaApp: PrismaApplication): VolunteerApplication {
    return new VolunteerApplication(
      prismaApp.id,
      prismaApp.userId,
      prismaApp.status,
      prismaApp.motivation,
      prismaApp.availability,
      prismaApp.linkedinProfile,
      prismaApp.phone,
      prismaApp.notes,
      prismaApp.createdAt,
      prismaApp.updatedAt,
    );
  }
}
