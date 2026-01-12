import { Injectable } from '@nestjs/common';
import { Route } from '../../domain/entities/route.entity';
import { RouteRepository } from '../../domain/ports/route.repository';

@Injectable()
export class ListRoutesUseCase {
  constructor(private readonly routeRepository: RouteRepository) {}

  async execute(): Promise<Route[]> {
    return this.routeRepository.findAll();
  }
}
