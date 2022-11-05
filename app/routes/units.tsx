import { json } from '@remix-run/node';

import { getUnits } from '~/models/unit.server';
import type { AsyncReturnType } from '~/types/modelTypes';

export type LoaderData = {
  units: AsyncReturnType<typeof getUnits>;
};

export const loader = async () =>
  json<LoaderData>({
    units: await getUnits(),
  });
