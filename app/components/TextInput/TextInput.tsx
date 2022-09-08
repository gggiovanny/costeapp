import type { TextInputProps as MantineTextInputProps } from '@mantine/core';
import { TextInput as MantineTextInput } from '@mantine/core';
import { useField } from 'remix-validated-form';

export default function TextInput({ name = '', ...rest }: MantineTextInputProps) {
  const { error, getInputProps } = useField(name);

  return <MantineTextInput name={name} error={error} {...getInputProps({ id: name })} {...rest} />;
}
