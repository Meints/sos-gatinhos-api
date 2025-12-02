import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Cat } from '../../../domain/entities/cat.entity';
import type { CatRepository } from '../../../domain/repositories/cat.repository.interface';
import { UpdateCatDto } from '../../dto/update-cat.dto';

@Injectable()
export class UpdateCatUseCase {
  constructor(
    @Inject('CatRepository') private readonly catRepository: CatRepository,
  ) {}

  async execute(id: string, dto: UpdateCatDto): Promise<Cat> {
    const existingCat = await this.catRepository.findById(id);
    if (!existingCat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    return await this.catRepository.update(id, dto);
  }
}
