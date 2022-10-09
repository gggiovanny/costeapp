import { Stack, Transition } from '@mantine/core';
import { withZod } from '@remix-validated-form/with-zod';
import { useState } from 'react';
import { FaBoxOpen, FaPercentage, FaRuler, FaTruckLoading } from 'react-icons/fa';
import { HiMinus } from 'react-icons/hi';
import { IoMdPricetag, IoMdTimer } from 'react-icons/io';
import { MdAdd, MdAttachMoney } from 'react-icons/md';
import { TbRuler2Off } from 'react-icons/tb';
import { ValidatedForm } from 'remix-validated-form';

import {
  DatePicker,
  NativeSelect,
  NumberInput,
  SliderInput,
  SubmitButton,
  TextInput,
} from '~/components/ValidatedFields';
import { suppliesCreateSchema } from '~/schemas/supplies';

import { KEYS, SUPPLIES_ADD_ROUTE } from './constants';

const frontValidator = withZod(suppliesCreateSchema);

const formId = 'AddSupplyForm';

const units = [
  { value: '1', label: 'KG' },
  { value: '2', label: 'AT' },
  { value: '3', label: 'PAQ' },
];

export default function AddSupplyModal() {
  const [inputUnitId, setInputUnitId] = useState('');
  const [outputUnitId, setOutputUnitId] = useState('');

  const inputUnit = units.find(({ value }) => value === inputUnitId)?.label ?? 'unidad de entrada';
  const outputUnit = units.find(({ value }) => value === outputUnitId)?.label ?? 'unidad de salida';

  function handleInputUnitChange(value: string) {
    setInputUnitId(value);
    setOutputUnitId(value);
  }

  return (
    <ValidatedForm validator={frontValidator} method="post" action={SUPPLIES_ADD_ROUTE} id={formId}>
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
        <NativeSelect
          name={KEYS.outputUnitId}
          onChange={setOutputUnitId}
          value={outputUnitId}
          label="Unidad de salida"
          data={units}
          icon={<TbRuler2Off />}
        />
        <Transition
          mounted={inputUnitId !== outputUnitId}
          transition="fade"
          duration={500}
          timingFunction="ease"
        >
          {styles => (
            <NumberInput
              style={styles}
              name={KEYS.inputToOutputUnitMultiplier}
              label="Factor de conversión"
              description={`1 ${inputUnit} equivale a cuantos ${outputUnit}`}
              placeholder="Factor de conversión"
              precision={2}
              defaultValue={1}
              icon={<FaPercentage />}
            />
          )}
        </Transition>
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
