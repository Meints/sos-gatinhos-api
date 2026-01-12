import { Injectable, NotFoundException } from '@nestjs/common';
import { RouteRunRepository } from '../../domain/ports/route-run.repository';
import { FinishRouteRunDto } from '../../dto/route-run.dto';
import { RouteRunStatus } from '../../domain/entities/route-run.entity';
import { RouteRun } from 'src/routes/domain/entities/RouteRun';

@Injectable()
export class FinishRouteRunUseCase {
  constructor(private readonly routeRunRepository: RouteRunRepository) {}

  async execute(routeRunId: string, dto: FinishRouteRunDto): Promise<void> {
    const run = await this.routeRunRepository.findById(routeRunId);
    if (!run) {
      throw new NotFoundException(`Route Run with ID ${routeRunId} not found`);
    }

    const updatedRun = new RouteRun(
      run.id,
      run.routeId,
      run.userId,
      run.startTime,
      new Date(),
      RouteRunStatus.COMPLETED,
      dto.notes || run.notes,
      run.checkIns || [],
    );

    await this.routeRunRepository.update(updatedRun);
  }
}
