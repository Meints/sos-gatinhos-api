import { Injectable } from '@nestjs/common';
import { Route } from '../../domain/entities/route.entity';
import { RouteRepository } from '../../domain/ports/route.repository';
import { CreateRouteDto } from '../../dto/create-route.dto';
@Injectable()
export class CreateRouteUseCase {
  constructor(private readonly routeRepository: RouteRepository) {}

  async execute(createRouteDto: CreateRouteDto): Promise<Route> {
    return this.routeRepository.create({
      title: createRouteDto.title,
      description: createRouteDto.description || null,
    });
  }
}
