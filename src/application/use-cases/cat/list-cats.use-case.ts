import { Inject, Injectable } from '@nestjs/common';
import { Cat } from '../../../domain/entities/cat.entity';
import type { CatRepository } from '../../../domain/repositories/cat.repository.interface';

@Injectable()
export class ListCatsUseCase {
  constructor(
    @Inject('CatRepository')
    private readonly catRepository: CatRepository,
  ) {}

  async execute(): Promise<Cat[]> {
    return await this.catRepository.findAll();
  }
}
