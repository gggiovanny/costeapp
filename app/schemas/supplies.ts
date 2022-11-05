import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { POSITIVE_NUMBER_REGEX } from '~/constants/regex';

import { createDecimalType, createNameType, createNumberType } from './basicTypes';

export const suppliesCreateSchema = z.object({
  supplyName: createNameType('El nombre'),
  purchaseCost: createDecimalType('El costo de compra'),
  lossPercentage: z
    .string()
    .trim()
    .regex(POSITIVE_NUMBER_REGEX, 'La merma debe ser un número positivo')
    .refine(
      n => Number(n) >= 0 && Number(n) <= 100,
      'La merma debe ser un porcentaje entre 0 y 100'
    )
    .transform(n => new Prisma.Decimal(n).div(100)),
  brand: createNameType('La marca'),
  supplier: createNameType('El proveedor'),
  inputUnitId: createNumberType('La unidad de entrada'),
  outputUnitId: createNumberType('La unidad de salida'),
  inputToOutputUnitMultiplier: createDecimalType('El factor de conversión'),
  minStock: createDecimalType('El stock mínimo'),
  maxStock: createDecimalType('El stock máximo'),
  expiration: z.string(), // TODO: check
});
