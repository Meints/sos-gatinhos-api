import { RoutePoint } from './route-point.entity';

export class Route {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string | null,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly points: RoutePoint[] = [],
  ) {}
}
