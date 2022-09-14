import type { ActionFunction } from '@remix-run/node';
import { withZod } from '@remix-validated-form/with-zod';
import { validationError } from 'remix-validated-form';

import { deleteFixedCost } from '~/models/fixedCost.server';
import { fixedCostDeleteSchema } from '~/schemas/fixedCost';

const validator = withZod(fixedCostDeleteSchema);

export const action: ActionFunction = async ({ request }) => {
  const { data, error } = await validator.validate(await request.formData());
  if (error) return validationError(error);

  return deleteFixedCost(data.id);
};
