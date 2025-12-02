import { Module } from '@nestjs/common';
import { CatController } from '../controllers/cat.controller';
import { CreateCatUseCase } from '../../application/use-cases/cat/create-cat.use-case';
import { GetCatUseCase } from '../../application/use-cases/cat/get-cat.use-case';
import { ListCatsUseCase } from '../../application/use-cases/cat/list-cats.use-case';
import { UpdateCatUseCase } from '../../application/use-cases/cat/update-cat.use-case';
import { DeleteCatUseCase } from '../../application/use-cases/cat/delete-cat.use-case';
import { PrismaCatRepository } from '../../infrastructure/repositories/prisma-cat.repository';
import { CatRepository } from '../../domain/repositories/cat.repository.interface';

@Module({
  controllers: [CatController],
  providers: [
    {
      provide: 'CatRepository',
      useClass: PrismaCatRepository,
    },
    CreateCatUseCase,
    GetCatUseCase,
    ListCatsUseCase,
    UpdateCatUseCase,
    DeleteCatUseCase,
  ],
  exports: ['CatRepository'],
})
export class CatModule {}
