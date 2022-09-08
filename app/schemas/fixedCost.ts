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
    .transform(Number)
    .refine(n => n > 0, 'El costo mensual debe ser un valor positivo'),
});
