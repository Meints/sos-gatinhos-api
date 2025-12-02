import { Injectable } from '@nestjs/common';
import { Cat } from '../../domain/entities/cat.entity';
import { CatRepository } from '../../domain/repositories/cat.repository.interface';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PrismaCatRepository implements CatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(cat: Cat): Promise<Cat> {
    const created = await this.prisma.cat.create({
      data: {
        name: cat.name,
        age: cat.age,
        breed: cat.breed,
        description: cat.description,
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
        age: cat.age,
        breed: cat.breed,
        description: cat.description,
      },
    });
    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cat.delete({
      where: { id },
    });
  }

  private toDomain(prismaCat: {
    id: string;
    name: string;
    age: number;
    breed: string | null;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): Cat {
    return new Cat(
      prismaCat.id,
      prismaCat.name,
      prismaCat.age,
      prismaCat.breed,
      prismaCat.description,
      prismaCat.createdAt,
      prismaCat.updatedAt,
    );
  }
}
