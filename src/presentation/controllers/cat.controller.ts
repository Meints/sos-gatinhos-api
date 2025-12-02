import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCatUseCase } from '../../application/use-cases/cat/create-cat.use-case';
import { GetCatUseCase } from '../../application/use-cases/cat/get-cat.use-case';
import { ListCatsUseCase } from '../../application/use-cases/cat/list-cats.use-case';
import { UpdateCatUseCase } from '../../application/use-cases/cat/update-cat.use-case';
import { DeleteCatUseCase } from '../../application/use-cases/cat/delete-cat.use-case';
import type { CreateCatDto } from '../../application/dto/create-cat.dto';
import type { UpdateCatDto } from '../../application/dto/update-cat.dto';
import {
  Session,
  UserSession,
  AllowAnonymous,
} from '@thallesp/nestjs-better-auth';

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
  @ApiOperation({ summary: 'Create a new cat' })
  @ApiResponse({ status: 201, description: 'Cat created successfully' })
  async create(
    @Body() createCatDto: CreateCatDto,
    @Session() session: UserSession,
  ) {
    return this.createCatUseCase.execute(createCatDto, session?.user?.id);
  }

  @Get()
  @AllowAnonymous()
  @ApiOperation({ summary: 'Get all cats' })
  @ApiResponse({ status: 200, description: 'List of cats' })
  async findAll() {
    return this.listCatsUseCase.execute();
  }

  @Get(':id')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Get a cat by ID' })
  @ApiResponse({ status: 200, description: 'Cat found' })
  @ApiResponse({ status: 404, description: 'Cat not found' })
  async findOne(@Param('id') id: string) {
    return this.getCatUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cat' })
  @ApiResponse({ status: 200, description: 'Cat updated successfully' })
  @ApiResponse({ status: 404, description: 'Cat not found' })
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.updateCatUseCase.execute(id, updateCatDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cat' })
  @ApiResponse({ status: 200, description: 'Cat deleted successfully' })
  @ApiResponse({ status: 404, description: 'Cat not found' })
  async remove(@Param('id') id: string) {
    await this.deleteCatUseCase.execute(id);
    return { message: 'Cat deleted successfully' };
  }
}
