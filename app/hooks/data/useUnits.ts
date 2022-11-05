import type { SelectItem } from '@mantine/core';
import { useMemo } from 'react';

import { UNITS_ROUTE } from '~/constants/units';
import type { Unit } from '~/models/unit.server';
import type { LoaderData as UnitsLoaderData } from '~/routes/units';

import useData from './useData';

type SelectUnit = Unit & SelectItem;

export default function (): [SelectUnit[], boolean] {
  const [data, isLoading] = useData<UnitsLoaderData>(UNITS_ROUTE);

  const units = useMemo(
    () =>
      data?.units.map(unit => ({
        ...unit,
        value: unit.id.toString(),
        label: unit.unitName,
      })) ?? [],
    [data?.units]
  );

  return [units, isLoading];
}
