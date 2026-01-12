import { Injectable } from '@nestjs/common';
import { VolunteerRepository } from '../../domain/ports/volunteer.repository';
import { ApplyVolunteerDto } from '../../dto/apply-volunteer.dto';
import { VolunteerApplication } from '../../domain/entities/volunteer-application.entity';

@Injectable()
export class ApplyForVolunteerRoleUseCase {
  constructor(private readonly volunteerRepository: VolunteerRepository) {}

  async execute(
    userId: string,
    dto: ApplyVolunteerDto,
  ): Promise<VolunteerApplication> {
    const existing = await this.volunteerRepository.findByUserId(userId);
    if (existing && existing.status === 'PENDING') {
      throw new Error('User already has a pending application.');
    }

    return this.volunteerRepository.create({
      userId,
      ...dto,
    });
  }
}
