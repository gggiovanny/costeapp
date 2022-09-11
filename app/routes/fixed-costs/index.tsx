import { Badge, Button, Group, Table, Title } from '@mantine/core';
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { MdAdd, MdSave } from 'react-icons/md';
import { ValidatedForm, validationError } from 'remix-validated-form';

import ErrorPage from '~/components/ErrorPage';
import NumberInput from '~/components/NumberInput';
import SubmitButton from '~/components/SubmitButton';
import TextInput from '~/components/TextInput';
import useFormAutosave, { LAST_SAVED_DATE_KEY } from '~/hooks/useFormAutosave';
import {
  bulkUpdateFixedCosts,
  getFixedCosts,
  totalMonthlyFixedCosts,
} from '~/models/fixedCost.server';
import type { fixedCostsBulkUpdateType } from '~/schemas/fixedCost';
import { CHANGED_FIXED_COSTS_KEY, fixedCostsBulkUpdateSchema } from '~/schemas/fixedCost';
import type { AsyncReturnType } from '~/types/modelTypes';
import moneyFormatter from '~/utils/moneyFormatter';

import { COST_ID_KEY, COST_NAME_KEY, MONTLY_COST_KEY } from './constants';

type LoaderData = {
  fixedCosts: AsyncReturnType<typeof getFixedCosts>;
  total: AsyncReturnType<typeof totalMonthlyFixedCosts>;
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

  return json({
    [LAST_SAVED_DATE_KEY]: updatedFixedCosts.at(-1)?.updatedAt,
  });
};

const formId = 'fixedCostsForm';

export default function FixedCostsTable() {
  const { fixedCosts, total } = useLoaderData<LoaderData>();

  const { savedStatusMessage, validatedFormProps, saveButtonProps } =
    useFormAutosave<fixedCostsBulkUpdateType>(formId);

  return (
    <ValidatedForm validator={validator} {...validatedFormProps}>
      <Group position="apart">
        <Title order={1}>Costos Fijos</Title>
        <Group>
          <Button component={Link} to="add" leftIcon={<MdAdd />}>
            Agregar
          </Button>
          <SubmitButton leftIcon={<MdSave />} {...saveButtonProps}>
            Guardar cambios
          </SubmitButton>
          {savedStatusMessage && <Badge>{savedStatusMessage}</Badge>}
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
