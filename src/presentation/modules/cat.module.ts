import { Module } from '@nestjs/common';
import { CreateCatUseCase } from '../../application/use-cases/cat/create-cat.use-case';
import { DeleteCatUseCase } from '../../application/use-cases/cat/delete-cat.use-case';
import { GetCatUseCase } from '../../application/use-cases/cat/get-cat.use-case';
import { ListCatsUseCase } from '../../application/use-cases/cat/list-cats.use-case';
import { UpdateCatUseCase } from '../../application/use-cases/cat/update-cat.use-case';
import { PrismaCatRepository } from '../../infrastructure/repositories/prisma-cat.repository';
import { CatController } from '../controllers/cat.controller';

@Module({
  controllers: [CatController],
  providers: [
    CreateCatUseCase,
    GetCatUseCase,
    ListCatsUseCase,
    UpdateCatUseCase,
    DeleteCatUseCase,
    {
      provide: 'CatRepository',
      useClass: PrismaCatRepository,
    },
  ],
})
export class CatModule {}
