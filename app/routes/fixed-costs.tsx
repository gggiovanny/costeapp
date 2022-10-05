import { ActionIcon, Box, Button, Group, LoadingOverlay, Table, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useFetcher, useLoaderData, useTransition } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { MdAdd, MdAttachMoney, MdDelete } from 'react-icons/md';
import { ValidatedForm, validationError } from 'remix-validated-form';

import ConfirmationButton from '~/components/ConfirmationButton';
import ErrorPage from '~/components/ErrorPage';
import NumberInput from '~/components/NumberInput';
import RouteContainer from '~/components/RouteContainer';
import TextInput from '~/components/TextInput';
import useFormAutosave from '~/hooks/useFormAutosave';
import {
  bulkUpdateFixedCosts,
  getFixedCosts,
  totalMonthlyFixedCosts,
} from '~/models/fixedCost.server';
import type { fixedCostsBulkUpdateType } from '~/schemas/fixedCost';
import { CHANGED_FIXED_COSTS_KEY, fixedCostsBulkUpdateSchema } from '~/schemas/fixedCost';
import useStickyStyles from '~/styles/hooks/useStickyStyles';
import type { AsyncReturnType } from '~/types/modelTypes';
import moneyFormatter from '~/utils/moneyFormatter';

import AddFixedCostModal from './fixed-costs/add';
import {
  COST_ID_KEY,
  COST_NAME_KEY,
  FIXED_COSTS_DELETE_ROUTE,
  MONTLY_COST_KEY,
} from './fixed-costs/constants';

type LoaderData = {
  fixedCosts: AsyncReturnType<typeof getFixedCosts>;
  total: AsyncReturnType<typeof totalMonthlyFixedCosts>;
};

const updateValidator = withZod(fixedCostsBulkUpdateSchema);

const createGetInputName = (index: number) => (key: string) =>
  `${CHANGED_FIXED_COSTS_KEY}[${index}].${key}`;

export const loader = async () =>
  json<LoaderData>({
    fixedCosts: await getFixedCosts(),
    total: await totalMonthlyFixedCosts(),
  });

export const action: ActionFunction = async ({ request }) => {
  const { data, error } = await updateValidator.validate(await request.formData());
  if (error) return validationError(error);

  await bulkUpdateFixedCosts(data[CHANGED_FIXED_COSTS_KEY]);

  return 1;
};

const formId = 'fixedCostsForm';

export default function FixedCosts() {
  const { fixedCosts, total } = useLoaderData<LoaderData>();
  const { state } = useTransition();
  const { validatedFormProps, saveButtonProps } = useFormAutosave<fixedCostsBulkUpdateType>(formId);
  const deleteFetcher = useFetcher();
  const { classes: stickyClasses, cx } = useStickyStyles();
  const [isOpenAddModal, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);

  const isLoadingData = state !== 'idle';
  const isDeleting = deleteFetcher.state === 'submitting';

  const createDeleteFixedCostHandler = (id: number) => () => {
    deleteFetcher.submit(
      { id: id.toString() },
      { method: 'delete', action: FIXED_COSTS_DELETE_ROUTE }
    );
  };

  return (
    <RouteContainer>
      <LoadingOverlay visible={isLoadingData || isDeleting} />
      <Group position="apart" className={stickyClasses.top}>
        <Title order={1}>Costos Fijos</Title>
      </Group>
      <ValidatedForm validator={updateValidator} {...validatedFormProps}>
        <Table>
          <thead className={cx(stickyClasses.top, stickyClasses.topShadow)}>
            <tr>
              <th>Concepto</th>
              <th>Costo mensual</th>
              <th>
                <Button leftIcon={<MdAdd />} onClick={openAddModal}>
                  Agregar
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {fixedCosts.map(({ costName, montlyCost, id }, index) => {
              const getInputName = createGetInputName(index);
              return (
                <tr key={id}>
                  <Box component="td" sx={{ display: 'none' }}>
                    <input type="hidden" name={getInputName(COST_ID_KEY)} value={id} />
                  </Box>
                  <td>
                    <TextInput name={getInputName(COST_NAME_KEY)} defaultValue={costName} />
                  </td>
                  <td>
                    <NumberInput
                      name={getInputName(MONTLY_COST_KEY)}
                      precision={2}
                      defaultValue={Number(montlyCost)}
                      icon={<MdAttachMoney size={16} />}
                    />
                  </td>
                  <td>
                    <ConfirmationButton
                      message={
                        <span>
                          ¿Estás seguro de que quieres borrar <Text italic>{costName}</Text>
                        </span>
                      }
                      onClick={createDeleteFixedCostHandler(id)}
                    >
                      <ActionIcon>
                        <MdDelete />
                      </ActionIcon>
                    </ConfirmationButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className={cx(stickyClasses.bottom, stickyClasses.bottomShadow)}>
            <tr>
              <th>Total</th>
              <th>{moneyFormatter.format(Number(total))}</th>
              <th>
                <Button
                  size="xs"
                  {...saveButtonProps}
                  sx={{ maxWidth: '150px', fontSize: 'auto' }}
                />
              </th>
            </tr>
          </tfoot>
        </Table>
      </ValidatedForm>
      <AddFixedCostModal isOpen={isOpenAddModal} onClose={closeAddModal} />
      <Outlet />
    </RouteContainer>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorPage error={error} title="Ocurrió un error al cargar los costos fijos" />;
}
