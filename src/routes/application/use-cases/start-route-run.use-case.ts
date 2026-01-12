import { Injectable } from '@nestjs/common';
import { RouteRunRepository } from '../../domain/ports/route-run.repository';
import { StartRouteRunDto } from '../../dto/route-run.dto';
import { RouteRun } from 'src/routes/domain/entities/RouteRun';
@Injectable()
export class StartRouteRunUseCase {
  constructor(private readonly routeRunRepository: RouteRunRepository) {}

  async execute(
    routeId: string,
    userId: string,
    dto: StartRouteRunDto,
  ): Promise<RouteRun> {
    return this.routeRunRepository.create({
      routeId,
      userId,
      notes: dto.notes || null,
    });
  }
}
