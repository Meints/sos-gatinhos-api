import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service'; // Fix import path if needed
import {
  RouteRun,
  RouteRunStatus,
} from '../../domain/entities/route-run.entity';
import { CheckIn } from '../../domain/entities/check-in.entity';
import { RouteRunRepository } from '../../domain/ports/route-run.repository';
import {
  RouteRun as PrismaRouteRun,
  CheckIn as PrismaCheckIn,
  RouteRunStatus as PrismaRouteRunStatus,
} from '@prisma/client';

@Injectable()
export class PrismaRouteRunRepository implements RouteRunRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: {
    routeId: string;
    userId: string;
    notes?: string | null;
  }): Promise<RouteRun> {
    const created = await this.prisma.routeRun.create({
      data: {
        routeId: params.routeId,
        userId: params.userId,
        notes: params.notes,
        status: 'IN_PROGRESS',
      },
      include: { checkIns: true },
    });
    return this.mapToDomain(created);
  }

  async findById(id: string): Promise<RouteRun | null> {
    const run = await this.prisma.routeRun.findUnique({
      where: { id },
      include: { checkIns: true },
    });
    return run ? this.mapToDomain(run) : null;
  }

  async update(routeRun: RouteRun): Promise<RouteRun> {
    const updated = await this.prisma.routeRun.update({
      where: { id: routeRun.id },
      data: {
        endTime: routeRun.endTime,
        status: routeRun.status as PrismaRouteRunStatus,
        notes: routeRun.notes,
      },
      include: { checkIns: true },
    });
    return this.mapToDomain(updated);
  }

  async addCheckIn(params: {
    routeRunId: string;
    routePointId: string;
    photoUrl?: string | null;
    notes?: string | null;
  }): Promise<CheckIn> {
    const created = await this.prisma.checkIn.create({
      data: {
        routeRunId: params.routeRunId,
        routePointId: params.routePointId,
        photoUrl: params.photoUrl,
        notes: params.notes,
      },
    });
    return new CheckIn(
      created.id,
      created.routeRunId,
      created.routePointId,
      created.checkedAt,
      created.photoUrl,
      created.notes,
    );
  }

  private mapToDomain(
    prismaRun: PrismaRouteRun & { checkIns?: PrismaCheckIn[] },
  ): RouteRun {
    const checkIns = prismaRun.checkIns
      ? prismaRun.checkIns.map(
          (c) =>
            new CheckIn(
              c.id,
              c.routeRunId,
              c.routePointId,
              c.checkedAt,
              c.photoUrl,
              c.notes,
            ),
        )
      : [];

    return new RouteRun(
      prismaRun.id,
      prismaRun.routeId,
      prismaRun.userId,
      prismaRun.startTime,
      prismaRun.endTime,
      RouteRunStatus[prismaRun.status], // Ensure enum mapping is correct
      prismaRun.notes,
      checkIns,
    );
  }
}
