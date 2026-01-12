import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateRouteUseCase } from './application/use-cases/create-route.use-case';
import { ListRoutesUseCase } from './application/use-cases/list-routes.use-case';
import { AssignVolunteerUseCase } from './application/use-cases/assign-volunteer.use-case';
import { StartRouteRunUseCase } from './application/use-cases/start-route-run.use-case';
import { CheckInUseCase } from './application/use-cases/check-in.use-case';
import { FinishRouteRunUseCase } from './application/use-cases/finish-route-run.use-case';
import { CreateRouteDto } from './dto/create-route.dto';
import { AssignVolunteerDto } from './dto/assign-volunteer.dto';

@Controller('routes')
export class RoutesController {
  constructor(
    private readonly createRouteUseCase: CreateRouteUseCase,
    private readonly listRoutesUseCase: ListRoutesUseCase,
    private readonly assignVolunteerUseCase: AssignVolunteerUseCase,
    private readonly startRouteRunUseCase: StartRouteRunUseCase,
    private readonly checkInUseCase: CheckInUseCase,
    private readonly finishRouteRunUseCase: FinishRouteRunUseCase,
  ) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.createRouteUseCase.execute(createRouteDto);
  }

  @Post(':id/assign')
  assign(
    @Param('id') id: string,
    @Body() assignVolunteerDto: AssignVolunteerDto,
  ) {
    return this.assignVolunteerUseCase.execute(id, assignVolunteerDto);
  }

  @Get()
  findAll() {
    return this.listRoutesUseCase.execute();
  }
}
