import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from '../../../domain/entities/cat.entity';
import type { CatRepository } from '../../../domain/repositories/cat.repository.interface';

@Injectable()
export class GetCatUseCase {
  constructor(
    @Inject('CatRepository')
    private readonly catRepository: CatRepository,
  ) {}

  async execute(id: string): Promise<Cat> {
    const cat = await this.catRepository.findById(id);
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }
}
