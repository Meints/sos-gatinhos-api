import { Injectable } from '@nestjs/common';
import { VolunteerRepository } from '../../domain/ports/volunteer.repository';
import { VolunteerApplication } from '../../domain/entities/volunteer-application.entity';

@Injectable()
export class ListVolunteerApplicationsUseCase {
  constructor(private readonly volunteerRepository: VolunteerRepository) {}

  async execute(): Promise<VolunteerApplication[]> {
    return this.volunteerRepository.findAll();
  }
}
