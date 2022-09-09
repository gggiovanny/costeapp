import { Button, Group, Table, Title } from '@mantine/core';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { MdAdd } from 'react-icons/md';

import ErrorPage from '~/components/ErrorPage';
import type { FixedCost } from '~/models/fixedCost.server';
import { getFixedCosts } from '~/models/fixedCost.server';
import moneyFormatter from '~/utils/moneyFormatter';

type LoaderData = { fixedCosts: FixedCost[] };

export const loader = async () =>
  json<LoaderData>({
    fixedCosts: await getFixedCosts(),
  });

export default function FixedCostsTable() {
  const { fixedCosts } = useLoaderData<LoaderData>();

  const total = fixedCosts.reduce((acc, { montlyCost }) => acc + Number(montlyCost), 0);

  return (
    <>
      <Group position="apart">
        <Title order={1}>Costos Fijos</Title>
        <Button component={Link} to="add" leftIcon={<MdAdd />}>
          Agregar
        </Button>
      </Group>
      <Table>
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Costo mensual</th>
          </tr>
        </thead>
        <tbody>
          {fixedCosts.map(({ costName, montlyCost, id }) => {
            return (
              <tr key={id}>
                <td>{costName}</td>
                <td>{moneyFormatter.format(Number(montlyCost))}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th>{moneyFormatter.format(total)}</th>
          </tr>
        </tfoot>
      </Table>
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorPage error={error} title="Ocurrió un error al cargar los costos fijos" />;
}
