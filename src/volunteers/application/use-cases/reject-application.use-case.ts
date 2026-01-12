import { Injectable, NotFoundException } from '@nestjs/common';
import { VolunteerRepository } from '../../domain/ports/volunteer.repository';
import { VolunteerApplication } from '../../domain/entities/volunteer-application.entity';

@Injectable()
export class RejectVolunteerApplicationUseCase {
  constructor(private readonly volunteerRepository: VolunteerRepository) {}

  async execute(id: string): Promise<VolunteerApplication> {
    const application = await this.volunteerRepository.findById(id);
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return this.volunteerRepository.updateStatus(id, 'REJECTED');
  }
}
