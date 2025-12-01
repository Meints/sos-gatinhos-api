import { Cat } from "../entities/cat.entity";
import { Color, Gender, CatStatus } from "@prisma/client";

export interface CatRepository {
  create(cat: Cat): Promise<Cat>;
  findById(id: string): Promise<Cat | null>;
  findAll(filters?: {
    status?: CatStatus;
    color?: Color;
    gender?: Gender;
  }): Promise<Cat[]>;
  update(id: string, cat: Partial<Cat>): Promise<Cat>;
  delete(id: string): Promise<void>;
}

