import type { ActionFunction } from '@remix-run/node';
import { withZod } from '@remix-validated-form/with-zod';
import { validationError } from 'remix-validated-form';

import ErrorPage from '~/components/ErrorPage';
import { deleteFixedCost } from '~/models/fixedCost.server';
import { fixedCostDeleteSchema } from '~/schemas/fixedCost';

const deletionValidator = withZod(fixedCostDeleteSchema);

export const action: ActionFunction = async ({ request }) => {
  const { data, error } = await deletionValidator.validate(await request.formData());
  if (error) return validationError(error);

  return deleteFixedCost(data.id);
};

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorPage error={error} title="Ocurrió un error al eliminar un costo fijo" />;
}
