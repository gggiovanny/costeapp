import type { NumberInputProps as MantineNumberInputProps } from '@mantine/core';
import { NumberInput as MantineNumberInput } from '@mantine/core';
import { useField } from 'remix-validated-form';

export default function NumberInput({ name = '', ...rest }: MantineNumberInputProps) {
  const { error, getInputProps } = useField(name);

  return (
    <MantineNumberInput name={name} error={error} {...getInputProps({ id: name })} {...rest} />
  );
}
