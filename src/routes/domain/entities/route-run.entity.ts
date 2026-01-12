import { CheckIn } from '@prisma/client';

export enum RouteRunStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED',
}

export class RouteRun {
  constructor(
    public readonly id: string,
    public readonly routeId: string,
    public readonly userId: string,
    public readonly startTime: Date,
    public readonly endTime: Date | null,
    public readonly status: RouteRunStatus,
    public readonly notes: string | null,
    public readonly checkIns: CheckIn[] = [],
  ) {}
}
