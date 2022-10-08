import type { NativeSelectProps as MantineNativeSelectProps } from '@mantine/core';
import { NativeSelect as MantineNativeSelect } from '@mantine/core';
import { useField } from 'remix-validated-form';

export default function NativeSelect({ name = '', ...rest }: MantineNativeSelectProps) {
  const { error, getInputProps } = useField(name);

  return <MantineNativeSelect name={name} error={error} {...getInputProps()} {...rest} />;
}
