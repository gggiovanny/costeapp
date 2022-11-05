import { Collapse, Stack } from '@mantine/core';
import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { withZod } from '@remix-validated-form/with-zod';
import { FaBoxOpen, FaPercentage, FaRuler, FaTruckLoading } from 'react-icons/fa';
import { HiMinus } from 'react-icons/hi';
import { IoMdPricetag, IoMdTimer } from 'react-icons/io';
import { MdAdd, MdAttachMoney } from 'react-icons/md';
import { TbRuler2Off } from 'react-icons/tb';
import { useControlField, ValidatedForm, validationError } from 'remix-validated-form';

import {
  DatePicker,
  NativeSelect,
  NumberInput,
  SliderInput,
  SubmitButton,
  TextInput,
} from '~/components/ValidatedFields';
import useUnits from '~/hooks/data/useUnits';
import { createSupply } from '~/models/supply.server';
import { suppliesCreateSchema } from '~/schemas/supplies';

import { KEYS, SUPPLIES_ADD_ROUTE, SUPPLIES_ROUTE } from '../../constants/constants';

const creationValidator = withZod(suppliesCreateSchema);

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log('file: add.tsx ~ line 28 ~ formData', Object.fromEntries(formData));
  const { data, error } = await creationValidator.validate(formData);
  if (error) return validationError(error);

  await createSupply(data);
  return redirect(SUPPLIES_ROUTE);
};

const formId = 'AddSupplyForm';

export default function AddSupplyModal() {
  const [units] = useUnits();

  const [inputUnitId, setInputUnitId] = useControlField<string>(KEYS.inputUnitId, formId);
  const [outputUnitId, setOutputUnitId] = useControlField<string>(KEYS.outputUnitId, formId);

  const inputUnit = units.find(({ value }) => value === inputUnitId)?.label ?? 'unidad de entrada';
  const outputUnit =
    units.find(({ value }) => value === outputUnitId)?.label ?? 'unidades de salida';

  function handleInputUnitChange(value: string) {
    setInputUnitId(value);
    setOutputUnitId(value);
  }

  return (
    <ValidatedForm
      validator={creationValidator}
      method="post"
      action={SUPPLIES_ADD_ROUTE}
      id={formId}
    >
      <Stack>
        <TextInput
          name={KEYS.supplyName}
          label="Nombre"
          placeholder="Nombre"
          icon={<FaBoxOpen />}
        />
        <NumberInput
          name={KEYS.purchaseCost}
          label="Costo de compra"
          placeholder="Costo de compra"
          precision={2}
          icon={<MdAttachMoney />}
        />
        <SliderInput
          name={KEYS.lossPercentage}
          label="Merma %"
          defaultValue={0}
          min={0}
          max={100}
          step={1}
        />
        {/* TODO: Add substitute */}
        <TextInput name={KEYS.brand} label="Marca" placeholder="Marca" icon={<IoMdPricetag />} />
        <TextInput
          name={KEYS.supplier}
          label="Proveedor"
          placeholder="Proveedor"
          icon={<FaTruckLoading />}
        />
        <NativeSelect
          name={KEYS.inputUnitId}
          onChange={handleInputUnitChange}
          value={inputUnitId}
          label="Unidad de entrada"
          data={units}
          icon={<FaRuler />}
        />
        <Collapse in={!!inputUnitId}>
          <NativeSelect
            name={KEYS.outputUnitId}
            onChange={setOutputUnitId}
            value={outputUnitId}
            label="Unidad de salida"
            data={units}
            icon={<TbRuler2Off />}
          />
        </Collapse>
        <Collapse in={inputUnitId !== outputUnitId}>
          <NumberInput
            name={KEYS.inputToOutputUnitMultiplier}
            label="Factor de conversión"
            description={`1 ${inputUnit} equivale a cuant@s ${outputUnit}s`}
            placeholder="Factor de conversión"
            precision={2}
            defaultValue={1}
            icon={<FaPercentage />}
          />
        </Collapse>

        <NumberInput
          name={KEYS.minStock}
          label="Stock mínimo"
          description="La cantidad mínima deseada a tener en el inventario"
          placeholder="Stock mínimo"
          precision={2}
          icon={<HiMinus />}
        />
        <NumberInput
          name={KEYS.maxStock}
          label="Stock máximo"
          description="La máxima mínima deseada a tener en el inventario"
          placeholder="Stock máximo"
          precision={2}
          icon={<MdAdd />}
        />
        <DatePicker
          name={KEYS.expiration}
          label="Expiración"
          placeholder="Expiración"
          icon={<IoMdTimer />}
        />
        <SubmitButton>Agregar</SubmitButton>
      </Stack>
    </ValidatedForm>
  );
}
