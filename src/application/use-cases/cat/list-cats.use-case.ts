import { Injectable, Inject } from '@nestjs/common';
import { Cat } from '../../../domain/entities/cat.entity';
import type { CatRepository } from '../../../domain/repositories/cat.repository.interface';
import { Color, Gender, CatStatus } from '../../../../generated/prisma/client';

@Injectable()
export class ListCatsUseCase {
  constructor(
    @Inject('CatRepository') private readonly catRepository: CatRepository,
  ) {}

  async execute(filters?: {
    status?: CatStatus;
    color?: Color;
    gender?: Gender;
  }): Promise<Cat[]> {
    return await this.catRepository.findAll(filters);
  }
}
