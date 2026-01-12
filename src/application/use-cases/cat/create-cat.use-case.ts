import { Inject, Injectable } from '@nestjs/common';
import { Cat } from '../../../domain/entities/cat.entity';
import type { CatRepository } from '../../../domain/repositories/cat.repository.interface';
import { CreateCatDto } from '../../dto/cat/create-cat.dto';

@Injectable()
export class CreateCatUseCase {
  constructor(
    @Inject('CatRepository')
    private readonly catRepository: CatRepository,
  ) {}

  async execute(dto: CreateCatDto): Promise<Cat> {
    const cat = Cat.create(
      dto.name,
      dto.color,
      dto.gender,
      dto.status,
      dto.photos,
      dto.isNeutered,
      dto.description,
      dto.birthDate,
    );
    return await this.catRepository.create(cat);
  }
}
