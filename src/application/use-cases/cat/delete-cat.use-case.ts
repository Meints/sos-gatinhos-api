import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { CatRepository } from '../../../domain/repositories/cat.repository.interface';

@Injectable()
export class DeleteCatUseCase {
  constructor(
    @Inject('CatRepository') private readonly catRepository: CatRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const cat = await this.catRepository.findById(id);
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    await this.catRepository.delete(id);
  }
}
