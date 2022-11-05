import type { Supply } from '@prisma/client';

import { db } from '~/db.server';

export type { Supply };

export async function createSupply(supply: Omit<Supply, 'id' | 'preferedSupplyId'>) {
  return db.supply.create({ data: supply });
}
