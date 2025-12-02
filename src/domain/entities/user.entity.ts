import { UserRole } from 'prisma/generated/prisma/client';

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: UserRole,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN || this.role === UserRole.SUPER_ADMIN;
  }

  isVolunteer(): boolean {
    return this.role === UserRole.VOLUNTEER || this.isAdmin();
  }

  canManageCats(): boolean {
    return this.isVolunteer();
  }
}
