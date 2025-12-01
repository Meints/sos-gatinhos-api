import { z } from "zod";
import { Color, Gender, CatStatus } from "@prisma/client";

export const CreateCatSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  color: z.nativeEnum(Color),
  gender: z.nativeEnum(Gender),
  status: z.nativeEnum(CatStatus).optional(),
  description: z.string().optional(),
  photos: z.array(z.string()).optional(),
  birthDate: z.date().optional(),
  isNeutered: z.boolean().optional(),
});

export type CreateCatDto = z.infer<typeof CreateCatSchema>;

