import { Badge, Button, Group, Table, Title } from '@mantine/core';
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import dayjs from 'dayjs';
import { MdAdd, MdSave } from 'react-icons/md';
import { ValidatedForm, validationError } from 'remix-validated-form';

import ErrorPage from '~/components/ErrorPage';
import NumberInput from '~/components/NumberInput';
import SubmitButton from '~/components/SubmitButton';
import TextInput from '~/components/TextInput';
import useFormAutosave from '~/hooks/useFormAutosave';
import {
  bulkUpdateFixedCosts,
  getFixedCosts,
  totalMonthlyFixedCosts,
} from '~/models/fixedCost.server';
import { CHANGED_FIXED_COSTS_KEY, fixedCostsBulkUpdateSchema } from '~/schemas/fixedCost';
import type { AsyncReturnType } from '~/types/modelTypes';
import moneyFormatter from '~/utils/moneyFormatter';

import { COST_ID_KEY, COST_NAME_KEY, MONTLY_COST_KEY } from './constants';

type LoaderData = {
  fixedCosts: AsyncReturnType<typeof getFixedCosts>;
  total: AsyncReturnType<typeof totalMonthlyFixedCosts>;
};

type ActionData = {
  lastUpdateDate?: Date;
};

const validator = withZod(fixedCostsBulkUpdateSchema);
const createGetInputName = (index: number) => (key: string) =>
  `${CHANGED_FIXED_COSTS_KEY}[${index}].${key}`;

export const loader = async () =>
  json<LoaderData>({
    fixedCosts: await getFixedCosts(),
    total: await totalMonthlyFixedCosts(),
  });

export const action: ActionFunction = async ({ request }) => {
  const { data, error } = await validator.validate(await request.formData());
  if (error) return validationError(error);

  const updatedFixedCosts = await bulkUpdateFixedCosts(data[CHANGED_FIXED_COSTS_KEY]);

  return json<ActionData>({
    lastUpdateDate: updatedFixedCosts.at(-1)?.updatedAt,
  });
};

export default function FixedCostsTable() {
  const { fixedCosts, total } = useLoaderData<LoaderData>();
  const { fetcher, formRef } = useFormAutosave<ActionData>();
  const { data } = fetcher;

  const lastUpdateDate = data?.lastUpdateDate;

  return (
    <ValidatedForm validator={validator} fetcher={fetcher} method="put" formRef={formRef}>
      <Group position="apart">
        <Title order={1}>Costos Fijos</Title>
        <Group>
          <Button component={Link} to="add" leftIcon={<MdAdd />}>
            Agregar
          </Button>
          <SubmitButton leftIcon={<MdSave />}>Guardar cambios</SubmitButton>
          {lastUpdateDate && <Badge>Guardado {dayjs(lastUpdateDate).fromNow()}</Badge>}
        </Group>
      </Group>
      <Table>
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Costo mensual</th>
          </tr>
        </thead>
        <tbody>
          {fixedCosts.map(({ costName, montlyCost, id }, index) => {
            const getInputName = createGetInputName(index);
            return (
              <tr key={id}>
                <input type="hidden" name={getInputName(COST_ID_KEY)} value={id} />
                <td>
                  <TextInput name={getInputName(COST_NAME_KEY)} defaultValue={costName} />
                </td>
                <td>
                  <NumberInput
                    name={getInputName(MONTLY_COST_KEY)}
                    precision={2}
                    defaultValue={Number(montlyCost)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th>{moneyFormatter.format(Number(total))}</th>
          </tr>
        </tfoot>
      </Table>
    </ValidatedForm>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorPage error={error} title="Ocurrió un error al cargar los costos fijos" />;
}
