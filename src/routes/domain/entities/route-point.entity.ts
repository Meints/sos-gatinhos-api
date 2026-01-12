export class RoutePoint {
  constructor(
    public readonly id: string,
    public readonly routeId: string,
    public readonly sequence: number,
    public readonly title: string,
    public readonly description: string | null,
    public readonly latitude: number | null,
    public readonly longitude: number | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
