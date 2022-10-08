import type { DatePickerProps as MantineDatePickerProps } from '@mantine/dates';
import { DatePicker as MantineDatePicker } from '@mantine/dates';
import { useField } from 'remix-validated-form';

export default function DatePicker({ name = '', ...rest }: MantineDatePickerProps) {
  const { error, getInputProps } = useField(name);

  return <MantineDatePicker name={name} error={error} {...getInputProps({ id: name })} {...rest} />;
}
