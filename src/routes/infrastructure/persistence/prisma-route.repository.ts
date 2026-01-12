import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { Route } from '../../domain/entities/route.entity';
import { RoutePoint } from '../../domain/entities/route-point.entity';
import { RouteRepository } from '../../domain/ports/route.repository';
import {
  Route as PrismaRouteModel,
  RoutePoint as PrismaRoutePointModel,
} from '@prisma/client';

@Injectable()
export class PrismaRouteRepository implements RouteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(routeData: {
    title: string;
    description: string | null;
  }): Promise<Route> {
    const created = await this.prisma.route.create({
      data: {
        title: routeData.title,
        description: routeData.description,
        isActive: true, // explicit or rely on default
      },
      include: { points: true }, // Ensure we include points (empty) for mapping
    });
    return this.mapToDomain(created);
  }

  async findAll(): Promise<Route[]> {
    const routes = await this.prisma.route.findMany({
      include: { points: { orderBy: { sequence: 'asc' } } },
    });
    return routes.map((r) => this.mapToDomain(r));
  }

  async findById(id: string): Promise<Route | null> {
    const route = await this.prisma.route.findUnique({
      where: { id },
      include: { points: { orderBy: { sequence: 'asc' } } },
    });
    return route ? this.mapToDomain(route) : null;
  }

  async update(route: Route): Promise<Route> {
    const updated = await this.prisma.route.update({
      where: { id: route.id },
      data: {
        title: route.title,
        description: route.description,
        isActive: route.isActive,
        updatedAt: new Date(),
      },
    });
    return this.mapToDomain(updated);
  }

  async assignVolunteer(routeId: string, userId: string): Promise<void> {
    await this.prisma.volunteerAssignment.create({
      data: {
        routeId,
        userId,
      },
    });
  }

  private mapToDomain(
    prismaRoute: PrismaRouteModel & { points?: PrismaRoutePointModel[] },
  ): Route {
    const points = prismaRoute.points
      ? prismaRoute.points.map(
          (p) =>
            new RoutePoint(
              p.id,
              p.routeId,
              p.sequence,
              p.title,
              p.description,
              p.latitude,
              p.longitude,
              p.createdAt,
              p.updatedAt,
            ),
        )
      : [];

    return new Route(
      prismaRoute.id,
      prismaRoute.title,
      prismaRoute.description,
      prismaRoute.isActive,
      prismaRoute.createdAt,
      prismaRoute.updatedAt,
      points,
    );
  }
}
