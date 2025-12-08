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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCatDto } from '../../application/dto/cat/create-cat.dto';
import { UpdateCatDto } from '../../application/dto/cat/update-cat.dto';
import { CreateCatUseCase } from '../../application/use-cases/cat/create-cat.use-case';
import { DeleteCatUseCase } from '../../application/use-cases/cat/delete-cat.use-case';
import { GetCatUseCase } from '../../application/use-cases/cat/get-cat.use-case';
import { ListCatsUseCase } from '../../application/use-cases/cat/list-cats.use-case';
import { UpdateCatUseCase } from '../../application/use-cases/cat/update-cat.use-case';
import { Cat } from '../../domain/entities/cat.entity';

@ApiTags('cats')
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
  @ApiOperation({ summary: 'Create a new cat' })
  @ApiBody({ type: CreateCatDto })
  @ApiCreatedResponse({
    description: 'The cat has been successfully created.',
    type: Cat,
  })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return await this.createCatUseCase.execute(createCatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cats' })
  @ApiOkResponse({
    description: 'List of all cats.',
    type: [Cat],
  })
  async findAll(): Promise<Cat[]> {
    return await this.listCatsUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cat by ID' })
  @ApiParam({ name: 'id', description: 'Cat ID' })
  @ApiOkResponse({
    description: 'The cat has been found.',
    type: Cat,
  })
  async findOne(@Param('id') id: string): Promise<Cat> {
    return await this.getCatUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a cat' })
  @ApiParam({ name: 'id', description: 'Cat ID' })
  @ApiBody({ type: UpdateCatDto })
  @ApiOkResponse({
    description: 'The cat has been successfully updated.',
    type: Cat,
  })
  async update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    return await this.updateCatUseCase.execute(id, updateCatDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a cat' })
  @ApiParam({ name: 'id', description: 'Cat ID' })
  @ApiNoContentResponse({
    description: 'The cat has been successfully deleted.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteCatUseCase.execute(id);
  }
}
