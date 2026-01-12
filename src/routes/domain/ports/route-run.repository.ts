import { RouteRun } from '../entities/RouteRun';
import { CheckIn } from '../entities/check-in.entity';

export abstract class RouteRunRepository {
  abstract create(params: {
    routeId: string;
    userId: string;
    notes?: string | null;
  }): Promise<RouteRun>;
  abstract findById(id: string): Promise<RouteRun | null>;
  abstract update(routeRun: RouteRun): Promise<RouteRun>;
  abstract addCheckIn(params: {
    routeRunId: string;
    routePointId: string;
    photoUrl?: string | null;
    notes?: string | null;
  }): Promise<CheckIn>;
}
