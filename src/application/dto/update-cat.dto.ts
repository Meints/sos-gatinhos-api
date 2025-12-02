import { z } from 'zod';
import { CreateCatSchema } from './create-cat.dto';

export const UpdateCatSchema = CreateCatSchema.partial();
export type UpdateCatDto = z.infer<typeof UpdateCatSchema>;
