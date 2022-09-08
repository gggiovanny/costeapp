import { Container, Grid, Stack, Table, Text } from '@mantine/core';
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { MdAssignment, MdAttachMoney } from 'react-icons/md';
import { ValidatedForm, validationError } from 'remix-validated-form';

import NumberInput from '~/components/NumberInput';
import SubmitButton from '~/components/SubmitButton';
import TextInput from '~/components/TextInput';
import type { FixedCost } from '~/models/fixedCost.server';
import { createFixedCost, getFixedCosts } from '~/models/fixedCost.server';
import { fixedCostCreateSchema } from '~/schemas/fixedCost';
import moneyFormatter from '~/utils/moneyFormatter';

const { Col } = Grid;

const costNameKey = 'costName';
const montlyCostKey = 'montlyCost';

type LoaderData = { fixedCosts: FixedCost[] };

type ActionData = {
  fieldErrors?: {
    costName?: string;
    montlyCost?: string;
  };
  createdFixedCost?: FixedCost;
};

const validator = withZod(fixedCostCreateSchema);

export const loader = async () =>
  json<LoaderData>({
    fixedCosts: await getFixedCosts(),
  });

export const action: ActionFunction = async ({ request }) => {
  const { data, error } = await validator.validate(await request.formData());
  if (error) return validationError(error);

  const createdFixedCost = await createFixedCost(data);

  return json<ActionData>({ createdFixedCost });
};

export default function FixedCosts() {
  const { fixedCosts } = useLoaderData<LoaderData>();

  return (
    <Container>
      <Grid>
        <Col md={6}>
          <ValidatedForm validator={validator} method="post">
            <Stack>
              <TextInput
                name={costNameKey}
                label="Concepto"
                placeholder="Concepto"
                icon={<MdAssignment />}
              />
              <NumberInput
                name={montlyCostKey}
                label="Costo mensual"
                placeholder="Costo mensual"
                icon={<MdAttachMoney />}
              />
              <SubmitButton type="submit">Agregar</SubmitButton>
            </Stack>
          </ValidatedForm>
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
              {fixedCosts.map(({ costName, montlyCost, id }) => {
                return (
                  <tr key={id}>
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
