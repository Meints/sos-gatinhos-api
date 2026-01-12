import { Injectable, NotFoundException } from '@nestjs/common';
import { RouteRunRepository } from '../../domain/ports/route-run.repository';
import { CheckInDto } from '../../dto/route-run.dto';
import { CheckIn } from '../../domain/entities/check-in.entity';
@Injectable()
export class CheckInUseCase {
  constructor(private readonly routeRunRepository: RouteRunRepository) {}

  async execute(routeRunId: string, dto: CheckInDto): Promise<CheckIn> {
    const run = await this.routeRunRepository.findById(routeRunId);
    if (!run) {
      throw new NotFoundException(`Route Run with ID ${routeRunId} not found`);
    }

    return this.routeRunRepository.addCheckIn({
      routeRunId,
      routePointId: dto.routePointId,
      photoUrl: dto.photoUrl || null,
      notes: dto.notes || null,
    });
  }
}
