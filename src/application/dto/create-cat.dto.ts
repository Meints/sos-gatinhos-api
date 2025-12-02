import { z } from 'zod';
import { Color, Gender, CatStatus } from 'prisma/generated/prisma/client';

export const CreateCatSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  color: z.enum(Color),
  gender: z.enum(Gender),
  status: z.enum(CatStatus).optional(),
  description: z.string().optional(),
  photos: z.array(z.string()).optional(),
  birthDate: z.date().optional(),
  isNeutered: z.boolean().optional(),
});

export type CreateCatDto = z.infer<typeof CreateCatSchema>;
