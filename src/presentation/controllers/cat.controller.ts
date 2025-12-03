import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCatDto } from '../../application/dto/cat/create-cat.dto';
import { UpdateCatDto } from '../../application/dto/cat/update-cat.dto';
import { CreateCatUseCase } from '../../application/use-cases/cat/create-cat.use-case';
import { DeleteCatUseCase } from '../../application/use-cases/cat/delete-cat.use-case';
import { GetCatUseCase } from '../../application/use-cases/cat/get-cat.use-case';
import { ListCatsUseCase } from '../../application/use-cases/cat/list-cats.use-case';
import { UpdateCatUseCase } from '../../application/use-cases/cat/update-cat.use-case';
import { Cat } from '../../domain/entities/cat.entity';

@Controller('cats')
export class CatController {
  constructor(
    private readonly createCatUseCase: CreateCatUseCase,
    private readonly getCatUseCase: GetCatUseCase,
    private readonly listCatsUseCase: ListCatsUseCase,
    private readonly updateCatUseCase: UpdateCatUseCase,
    private readonly deleteCatUseCase: DeleteCatUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return await this.createCatUseCase.execute(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return await this.listCatsUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return await this.getCatUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    return await this.updateCatUseCase.execute(id, updateCatDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteCatUseCase.execute(id);
  }
}
