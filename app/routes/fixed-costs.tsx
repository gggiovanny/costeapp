import { Button, Container, Grid, Stack, Table, Text, TextInput } from '@mantine/core';
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react';
import { MdAssignment, MdAttachMoney } from 'react-icons/md';

import type { FixedCost } from '~/models/fixedCost.server';
import { createFixedCost, getFixedCosts } from '~/models/fixedCost.server';
import moneyFormatter from '~/utils/moneyFormatter';

const { Col } = Grid;

const costNameKey = 'costName';
const montlyCostKey = 'montlyCost';

type LoaderData = { fixedCosts: FixedCost[] };

type ActionData = {
  formError?: string;
  fieldErrors?: {
    costName: string | undefined;
    montlyCost: string | undefined;
  };
  fields?: {
    costName: string;
    montlyCost: number;
  };
  createdFixedCost?: FixedCost;
};

export const loader = async () =>
  json<LoaderData>({
    fixedCosts: await getFixedCosts(),
  });

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const costName = formData.get(costNameKey);
  const montlyCost = Number(formData.get(montlyCostKey));

  if (typeof costName !== 'string' || typeof montlyCost !== 'number') {
    return badRequest({
      formError: 'Hay errores en el formulario',
    });
  }

  const fieldErrors = {
    costName: costName.length >= 3 ? undefined : 'El concepto es demasiado corto',
    montlyCost: montlyCost > 0 ? undefined : 'El costo mensual debe ser mayor a 0',
  };

  const fields = { costName, montlyCost };
  if (Object.values(fieldErrors).some(errorMessage => errorMessage)) {
    return badRequest({ fieldErrors, fields });
  }

  const createdFixedCost = await createFixedCost(fields);

  return json<ActionData>({ createdFixedCost });
};

export default function FixedCosts() {
  const { fixedCosts } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  const isCreating = !!transition.submission;

  const { costName: costNameError, montlyCost: montlyCostError } = actionData?.fieldErrors || {};
  const formError = actionData?.formError;

  return (
    <Container>
      <Grid>
        <Col md={6}>
          <Form method="post">
            <Stack>
              <TextInput
                name={costNameKey}
                label="Concepto"
                placeholder="Concepto"
                icon={<MdAssignment />}
                error={costNameError}
              />
              <TextInput
                name={montlyCostKey}
                type="number"
                label="Costo mensual"
                placeholder="Costo mensual"
                icon={<MdAttachMoney />}
                error={montlyCostError}
              />
              <Button type="submit">{isCreating ? 'Agregando...' : 'Agregar'}</Button>
              <Text color="red">{formError}</Text>
            </Stack>
          </Form>
        </Col>
        <Col md={6}>
          <Text size="xl">Costos Fijos</Text>
          <Table>
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Costo mensual</th>
              </tr>
            </thead>
            <tbody>
              {fixedCosts.map(({ costName, montlyCost }, index) => {
                return (
                  <tr key={index}>
                    <td>{costName}</td>
                    <td>{moneyFormatter.format(montlyCost)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Grid>
    </Container>
  );
}

export const ROUTE_NAME = 'fixed-costs';
