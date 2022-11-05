import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { POSITIVE_DECIMAL_NUMBER_REGEX } from '~/constants/regex';

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
    .regex(POSITIVE_DECIMAL_NUMBER_REGEX, `${label} debe ser un número positivo`)
    .transform(n => new Prisma.Decimal(n));

export const createNumberType = (label: string) =>
  z
    .string({
      required_error: `${label} es requerido`,
      invalid_type_error: `${label} debe ser enviado como texto`,
    })
    .trim()
    .regex(POSITIVE_DECIMAL_NUMBER_REGEX, `${label} debe ser un número positivo`)
    .transform(Number);
