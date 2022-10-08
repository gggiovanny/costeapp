import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { DECIMAL_NUMBER_REGEX } from '~/constants/regex';

export const createNameType = (label: string) =>
  z
    .string({
      required_error: `${label} es requerido`,
      invalid_type_error: `${label} debe ser enviado como texto`,
    })
    .trim()
    .min(1, `${label} es requerido`)
    .min(3, `${label} es demasiado corto`);

export const createDecimalType = (label: string) =>
  z
    .string({
      required_error: `${label} es requerido`,
      invalid_type_error: `${label} debe ser enviado como texto`,
    })
    .trim()
    .min(1, `${label} es requerido`)
    .regex(DECIMAL_NUMBER_REGEX, `${label} debe ser un número`)
    .refine(n => Number(n) > 0, `${label} debe ser un valor positivo`)
    .transform(n => new Prisma.Decimal(n));
