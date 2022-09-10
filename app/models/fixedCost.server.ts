import type { FixedCost } from '@prisma/client';

import { db } from '~/db.server';
import type { OmitMetadata } from '~/types/modelTypes';

export type { FixedCost };

export async function getFixedCosts() {
  return db.fixedCost.findMany({
    select: {
      id: true,
      costName: true,
      montlyCost: true,
    },
  });
}

export async function totalMonthlyFixedCosts() {
  const aggregation = await db.fixedCost.aggregate({
    _sum: { montlyCost: true },
  });
  return aggregation._sum.montlyCost;
}

export async function createFixedCost(fixedCost: Pick<FixedCost, 'costName' | 'montlyCost'>) {
  return db.fixedCost.create({ data: fixedCost });
}

export async function bulkUpdateFixedCosts(changedFixedCosts: OmitMetadata<FixedCost>[]) {
  const fixedCostUpdates = changedFixedCosts.map(({ id, ...rest }) =>
    db.fixedCost.update({
      data: rest,
      where: { id },
    })
  );

  return db.$transaction(fixedCostUpdates);
}
