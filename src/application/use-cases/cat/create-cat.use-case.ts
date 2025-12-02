import { Injectable, Inject } from '@nestjs/common';
import { Cat } from '../../../domain/entities/cat.entity';
import type { CatRepository } from '../../../domain/repositories/cat.repository.interface';
import { CreateCatDto } from '../../dto/create-cat.dto';
import { CatStatus } from 'prisma/generated/prisma/client';

@Injectable()
export class CreateCatUseCase {
  constructor(
    @Inject('CatRepository') private readonly catRepository: CatRepository,
  ) {}

  async execute(dto: CreateCatDto, userId?: string): Promise<Cat> {
    const cat = new Cat(
      crypto.randomUUID(),
      dto.name,
      dto.color,
      dto.gender,
      dto.status || CatStatus.AVAILABLE,
      dto.description,
      dto.photos || [],
      dto.birthDate,
      dto.isNeutered || false,
      userId,
    );

    return await this.catRepository.create(cat);
  }
}
