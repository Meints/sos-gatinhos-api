import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { CreateRouteUseCase } from './application/use-cases/create-route.use-case';
import { ListRoutesUseCase } from './application/use-cases/list-routes.use-case';
import { AssignVolunteerUseCase } from './application/use-cases/assign-volunteer.use-case';
import { StartRouteRunUseCase } from './application/use-cases/start-route-run.use-case';
import { CheckInUseCase } from './application/use-cases/check-in.use-case';
import { FinishRouteRunUseCase } from './application/use-cases/finish-route-run.use-case';
import { RouteRepository } from './domain/ports/route.repository';
import { RouteRunRepository } from './domain/ports/route-run.repository';
import { PrismaRouteRepository } from './infrastructure/persistence/prisma-route.repository';
import { PrismaRouteRunRepository } from './infrastructure/persistence/prisma-route-run.repository';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

@Module({
  controllers: [RoutesController],
  providers: [
    CreateRouteUseCase,
    ListRoutesUseCase,
    AssignVolunteerUseCase,
    StartRouteRunUseCase,
    CheckInUseCase,
    FinishRouteRunUseCase,
    {
      provide: RouteRepository,
      useClass: PrismaRouteRepository,
    },
    {
      provide: RouteRunRepository,
      useClass: PrismaRouteRunRepository,
    },
    PrismaService,
  ],
})
export class RoutesModule {}
