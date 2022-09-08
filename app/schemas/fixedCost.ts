import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { DECIMAL_NUMBER_REGEX } from '~/constants/regex';

export const fixedCostCreateSchema = z.object({
  costName: z
    .string()
    .min(1, 'El concepto es requerido')
    .min(3, 'El concepto es demasiado corto')
    .trim(),
  montlyCost: z
    .string()
    .trim()
    .min(1, 'El costo mensual es requerido')
    .regex(DECIMAL_NUMBER_REGEX, 'El costo mensual debe ser un número')
    .transform(val => new Prisma.Decimal(val))
    .refine(n => n.gt(0), 'El costo mensual debe ser un valor positivo'),
});
