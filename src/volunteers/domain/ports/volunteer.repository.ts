import { VolunteerApplication } from '../entities/volunteer-application.entity';

export abstract class VolunteerRepository {
  abstract create(data: {
    userId: string;
    motivation: string;
    availability: string;
    linkedinProfile?: string | null;
    phone: string;
  }): Promise<VolunteerApplication>;

  abstract findAll(): Promise<VolunteerApplication[]>;
  abstract findById(id: string): Promise<VolunteerApplication | null>;

  abstract updateStatus(
    id: string,
    status: 'APPROVED' | 'REJECTED',
  ): Promise<VolunteerApplication>;

  abstract findByUserId(userId: string): Promise<VolunteerApplication | null>;
}
