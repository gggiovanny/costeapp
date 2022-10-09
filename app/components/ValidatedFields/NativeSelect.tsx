import type { NativeSelectProps as MantineNativeSelectProps } from '@mantine/core';
import { NativeSelect as MantineNativeSelect } from '@mantine/core';
import { useField } from 'remix-validated-form';

type Props = Omit<MantineNativeSelectProps, 'onChange'> & {
  onChange?: (value: string) => void;
};

export default function NativeSelect({ name = '', onChange, ...rest }: Props) {
  const { error, getInputProps } = useField(name);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChange && onChange(event.target.value);
  }
  const inputProps = getInputProps<Omit<MantineNativeSelectProps, 'data'>>({
    id: name,
    onChange: handleChange,
  });

  return (
    <MantineNativeSelect
      placeholder="Selecciona una opción"
      name={name}
      error={error}
      {...inputProps}
      {...rest}
    />
  );
}
