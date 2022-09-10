import { Stack } from '@mantine/core';
import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { withZod } from '@remix-validated-form/with-zod';
import { MdAssignment, MdAttachMoney } from 'react-icons/md';
import { ValidatedForm, validationError } from 'remix-validated-form';

import ContentCard from '~/components/ContentCard';
import ErrorPage from '~/components/ErrorPage';
import NumberInput from '~/components/NumberInput';
import SubmitButton from '~/components/SubmitButton';
import TextInput from '~/components/TextInput';
import { createFixedCost } from '~/models/fixedCost.server';
import { fixedCostCreateSchema } from '~/schemas/fixedCost';

import { COST_NAME_KEY, FIXED_COSTS_ROUTE, MONTLY_COST_KEY } from './constants';

const validator = withZod(fixedCostCreateSchema);

export const action: ActionFunction = async ({ request }) => {
  const { data, error } = await validator.validate(await request.formData());
  if (error) return validationError(error);

  await createFixedCost(data);
  return redirect(FIXED_COSTS_ROUTE);
};

export default function AddFixedCost() {
  return (
    <ContentCard title="Agregar costo fijo">
      <ValidatedForm validator={validator} method="post">
        <Stack>
          <TextInput
            name={COST_NAME_KEY}
            label="Concepto"
            placeholder="Concepto"
            icon={<MdAssignment />}
          />
          <NumberInput
            name={MONTLY_COST_KEY}
            precision={2}
            label="Costo mensual"
            placeholder="Costo mensual"
            icon={<MdAttachMoney />}
          />
          <SubmitButton type="submit">Agregar</SubmitButton>
        </Stack>
      </ValidatedForm>
    </ContentCard>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorPage error={error} title="Ocurrió un error al agregar un costo fijo" />;
}
