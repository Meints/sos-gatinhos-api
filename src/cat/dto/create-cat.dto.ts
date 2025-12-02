import { z } from 'zod';
import { Color } from '../../../generated/prisma/client';

export const CreateCatSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  color: z.nativeEnum(Color),
});
