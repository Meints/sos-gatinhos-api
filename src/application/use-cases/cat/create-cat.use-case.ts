import { Inject, Injectable } from '@nestjs/common';
import { Cat } from '../../../domain/entities/cat.entity';
import type { CatRepository } from '../../../domain/repositories/cat.repository.interface';
import { CreateCatDto } from '../../dto/create-cat.dto';

@Injectable()
export class CreateCatUseCase {
  constructor(
    @Inject('CatRepository')
    private readonly catRepository: CatRepository,
  ) {}

  async execute(dto: CreateCatDto): Promise<Cat> {
    const cat = Cat.create(dto.name, dto.age, dto.breed, dto.description);
    return await this.catRepository.create(cat);
  }
}
