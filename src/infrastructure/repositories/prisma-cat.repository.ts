import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Cat } from "../../domain/entities/cat.entity";
import { CatRepository } from "../../domain/repositories/cat.repository.interface";
import { Color, Gender, CatStatus } from "@prisma/client";

@Injectable()
export class PrismaCatRepository implements CatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(cat: Cat): Promise<Cat> {
    const created = await this.prisma.cat.create({
      data: {
        id: cat.id,
        name: cat.name,
        color: cat.color,
        gender: cat.gender,
        status: cat.status,
        description: cat.description,
        photos: cat.photos,
        birthDate: cat.birthDate,
        isNeutered: cat.isNeutered,
        userId: cat.userId,
      },
    });

    return this.toDomain(created);
  }

  async findById(id: string): Promise<Cat | null> {
    const cat = await this.prisma.cat.findUnique({
      where: { id },
    });

    return cat ? this.toDomain(cat) : null;
  }

  async findAll(filters?: {
    status?: CatStatus;
    color?: Color;
    gender?: Gender;
  }): Promise<Cat[]> {
    const cats = await this.prisma.cat.findMany({
      where: filters,
    });

    return cats.map((cat) => this.toDomain(cat));
  }

  async update(id: string, cat: Partial<Cat>): Promise<Cat> {
    const updated = await this.prisma.cat.update({
      where: { id },
      data: {
        name: cat.name,
        color: cat.color,
        gender: cat.gender,
        status: cat.status,
        description: cat.description,
        photos: cat.photos,
        birthDate: cat.birthDate,
        isNeutered: cat.isNeutered,
      },
    });

    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cat.delete({
      where: { id },
    });
  }

  private toDomain(prismaCat: any): Cat {
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
      prismaCat.userId,
      prismaCat.createdAt,
      prismaCat.updatedAt,
    );
  }
}

