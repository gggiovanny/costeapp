import { Stack } from '@mantine/core';
import { withZod } from '@remix-validated-form/with-zod';
import { FaBoxOpen } from 'react-icons/fa';
import { ValidatedForm } from 'remix-validated-form';

import {
  DatePicker,
  NativeSelect,
  NumberInput,
  Slider,
  TextInput,
} from '~/components/ValidatedFields';
import { suppliesCreateSchema } from '~/schemas/supplies';

import { FIELDS, SUPPLIES_ADD_ROUTE } from './constants';

const frontValidator = withZod(suppliesCreateSchema);

export default function AddSupplyModal() {
  return (
    <ValidatedForm validator={frontValidator} method="post" action={SUPPLIES_ADD_ROUTE}>
      <Stack>
        <TextInput
          name={FIELDS.supplyName}
          label="Nombre"
          placeholder="Nombre"
          icon={<FaBoxOpen />}
        />
        <NumberInput
          name={FIELDS.purchaseCost}
          label="Costo de compra"
          placeholder="Costo de compra"
          precision={2}
        />
        <Slider
          name={FIELDS.lossPercentage}
          label="Merma"
          defaultValue={0}
          min={0}
          max={1}
          step={0.1}
        />
        {/* TODO: Add substitute */}
        <TextInput name={FIELDS.brand} label="Marca" placeholder="Marca" />
        <TextInput name={FIELDS.supplier} label="Proveedor" placeholder="Proveedor" />
        <NativeSelect
          name={FIELDS.inputUnitId}
          label="Unidad de entrada"
          data={['KG', 'PAQ', 'AT']}
        />
        <NativeSelect
          name={FIELDS.outputUnitId}
          label="Unidad de salida"
          data={['KG', 'PAQ', 'AT']}
        />
        <NumberInput
          name={FIELDS.inputToOutputUnitMultiplier}
          label="Factor de conversión"
          description="1 {unidad de entrada} equivale a cuantos {unidad de salida}"
          placeholder="Costo de compra"
          precision={4}
        />
        <NumberInput
          name={FIELDS.minStock}
          label="Stock mínimo"
          description="La cantidad mínima deseada a tener en el inventario"
          placeholder="Stock mínimo"
          precision={2}
        />
        <NumberInput
          name={FIELDS.maxStock}
          label="Stock máximo"
          description="La máxima mínima deseada a tener en el inventario"
          placeholder="Stock máximo"
          precision={2}
        />
        <DatePicker name={FIELDS.expiration} label="Expiración" placeholder="Expiración" />
      </Stack>
    </ValidatedForm>
  );
}
