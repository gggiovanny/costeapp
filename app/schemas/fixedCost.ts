import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { DECIMAL_NUMBER_REGEX } from '~/constants/regex';

export const fixedCostCreateSchema = z.object({
  costName: z
    .string({
      required_error: 'El concepto es requerido',
      invalid_type_error: 'El concepto debe ser enviado como texto',
    })
    .trim()
    .min(1, 'El concepto es requerido')
    .min(3, 'El concepto es demasiado corto')
    .trim(),
  montlyCost: z
    .string({
      required_error: 'El costo mensual es requerido',
      invalid_type_error: 'El costo mensual debe ser enviado como texto',
    })
    .trim()
    .min(1, 'El costo mensual es requerido')
    .regex(DECIMAL_NUMBER_REGEX, 'El costo mensual debe ser un número')
    .refine(n => Number(n) > 0, 'El costo mensual debe ser un valor positivo')
    .transform(n => new Prisma.Decimal(n)),
});

const fixedCostIdSchema = z.string().transform(Number);

export const CHANGED_FIXED_COSTS_KEY = 'changedFixedCosts';

export const fixedCostsBulkUpdateSchema = z.object({
  [CHANGED_FIXED_COSTS_KEY]: fixedCostCreateSchema
    .partial()
    .extend({
      id: fixedCostIdSchema,
    })
    .array(),
});

export type fixedCostsBulkUpdateType = z.infer<typeof fixedCostsBulkUpdateSchema>;

export const fixedCostDeleteSchema = z.object({
  id: fixedCostIdSchema,
});
