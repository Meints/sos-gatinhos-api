import { Cat } from '../entities/cat.entity';

export interface CatRepository {
  create(cat: Cat): Promise<Cat>;
  findById(id: string): Promise<Cat | null>;
  findAll(): Promise<Cat[]>;
  update(id: string, cat: Cat): Promise<Cat>;
  delete(id: string): Promise<void>;
}
