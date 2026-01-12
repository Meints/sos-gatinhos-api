import { Injectable } from '@nestjs/common';
import { Cat } from '../../domain/entities/cat.entity';
import { CatRepository } from '../../domain/repositories/cat.repository.interface';
import { PrismaService } from '../database/prisma.service';
import { Cat as PrismaCat } from '@prisma/client';

@Injectable()
export class PrismaCatRepository implements CatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(cat: Cat): Promise<Cat> {
    const created = await this.prisma.cat.create({
      data: {
        name: cat.name,
        color: cat.color,
        gender: cat.gender,
        status: cat.status,
        description: cat.description,
        photos: cat.photos || [],
        birthDate: cat.birthDate,
        isNeutered: cat.isNeutered,
      },
    });
    return this.toDomain(created);
  }

  async findById(id: string): Promise<Cat | null> {
    const found = await this.prisma.cat.findUnique({
      where: { id },
    });
    return found ? this.toDomain(found) : null;
  }

  async findAll(): Promise<Cat[]> {
    const cats = await this.prisma.cat.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return cats.map((cat) => this.toDomain(cat));
  }

  async update(id: string, cat: Cat): Promise<Cat> {
    const updated = await this.prisma.cat.update({
      where: { id },
      data: {
        name: cat.name,
        color: cat.color,
        gender: cat.gender,
        status: cat.status,
        description: cat.description,
        photos: cat.photos || [],
        birthDate: cat.birthDate,
        isNeutered: cat.isNeutered,
        updatedAt: new Date(),
      },
    });
    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cat.delete({
      where: { id },
    });
  }

  private toDomain(prismaCat: PrismaCat): Cat {
    return new Cat(
      prismaCat.id,
      prismaCat.name,
      prismaCat.color,
      prismaCat.gender,
      prismaCat.status,
      prismaCat.description,
      prismaCat.photos,
      prismaCat.birthDate,
      prismaCat.isNeutered,
      prismaCat.createdAt,
      prismaCat.updatedAt,
    );
  }
}
