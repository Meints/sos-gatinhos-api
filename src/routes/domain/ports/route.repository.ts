import { Route } from '../entities/route.entity';

export abstract class RouteRepository {
  abstract create(route: {
    title: string;
    description: string | null;
  }): Promise<Route>;
  abstract findAll(): Promise<Route[]>;
  abstract findById(id: string): Promise<Route | null>;
  abstract update(route: Route): Promise<Route>;
  abstract assignVolunteer(routeId: string, userId: string): Promise<void>;
}
