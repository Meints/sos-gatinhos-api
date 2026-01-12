import { ApplicationStatus } from '@prisma/client';

export class VolunteerApplication {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly status: ApplicationStatus,
    public readonly motivation: string,
    public readonly availability: string,
    public readonly linkedinProfile: string | null,
    public readonly phone: string,
    public readonly notes: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
