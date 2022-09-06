import type { FixedCost } from '@prisma/client';

import { db } from '~/db.server';

export type { FixedCost };

export async function getFixedCosts() {
  return db.fixedCost.findMany();
}

export async function createFixedCost(fixedCost: Pick<FixedCost, 'costName' | 'montlyCost'>) {
  return db.fixedCost.create({ data: fixedCost });
}
