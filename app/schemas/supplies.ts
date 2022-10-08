import { z } from 'zod';

import { createDecimalType, createNameType } from './basicTypes';

export const suppliesCreateSchema = z.object({
  supplyName: createNameType('El nombre'),
  purchaseCost: createDecimalType('El costo de compra'),
  lossPercentage: createDecimalType('La merma'),
  brand: createNameType('La marca'),
  supplier: createNameType('El proveedor'),
  inputUnitId: z.number(), // TODO: check
  outputUnitId: z.number(), // TODO: check
  inputToOutputUnitMultiplier: createDecimalType('El factor de conversión'),
  minStock: createDecimalType('El stock mínimo'),
  maxStock: createDecimalType('El stock máximo'),
  expiration: z.string(), // TODO: check
});
