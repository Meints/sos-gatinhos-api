import { Color, Gender, CatStatus } from '../../../generated/prisma/client';

export class Cat {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly color: Color,
    public readonly gender: Gender,
    public status: CatStatus,
    public readonly description?: string,
    public readonly photos: string[] = [],
    public readonly birthDate?: Date,
    public readonly isNeutered: boolean = false,
    public readonly userId?: string,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}

  markAsAdopted(): void {
    this.status = CatStatus.ADOPTED;
  }

  markAsAvailable(): void {
    this.status = CatStatus.AVAILABLE;
  }

  isAvailable(): boolean {
    return this.status === CatStatus.AVAILABLE;
  }
}
