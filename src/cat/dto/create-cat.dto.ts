import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const CreateCatSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    color: z.enum(Prisma.Color),
});
