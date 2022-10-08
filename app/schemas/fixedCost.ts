import { z } from 'zod';

import { createDecimalType, createNameType } from './basicTypes';

export const fixedCostCreateSchema = z.object({
  costName: createNameType('El concepto'),
  montlyCost: createDecimalType('El costo mensual'),
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
