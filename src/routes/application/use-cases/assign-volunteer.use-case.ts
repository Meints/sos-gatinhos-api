import { Injectable, NotFoundException } from '@nestjs/common';
import { RouteRepository } from '../../domain/ports/route.repository';
import { AssignVolunteerDto } from '../../dto/assign-volunteer.dto';

@Injectable()
export class AssignVolunteerUseCase {
  constructor(private readonly routeRepository: RouteRepository) {}

  async execute(routeId: string, dto: AssignVolunteerDto): Promise<void> {
    const route = await this.routeRepository.findById(routeId);
    if (!route) {
      throw new NotFoundException(`Route with ID ${routeId} not found`);
    }

    // verification if user exists could be done here if we had UserRepository,
    // or rely on foreign key constraint in persistence layer.
    // Ideally Domain checks existence. For now we assume persistence handles FK error or we adding check.

    await this.routeRepository.assignVolunteer(routeId, dto.userId);
  }
}
