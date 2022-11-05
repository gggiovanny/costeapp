import type { Unit } from '@prisma/client';

import { db } from '~/db.server';

export type { Unit };

export async function getUnits() {
  return db.unit.findMany({
    select: {
      id: true,
      unitName: true,
      abbreviation: true,
    },
  });
}
