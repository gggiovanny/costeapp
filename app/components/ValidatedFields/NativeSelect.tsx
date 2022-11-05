import type { NativeSelectProps as MantineNativeSelectProps, SelectItem } from '@mantine/core';
import { NativeSelect as MantineNativeSelect } from '@mantine/core';
import { useMemo } from 'react';
import { useField } from 'remix-validated-form';

type Props = Omit<MantineNativeSelectProps, 'onChange' | 'data'> & {
  onChange?: (value: string) => void;
  data: SelectItem[];
};

export default function NativeSelect({ name = '', onChange, data, placeholder, ...rest }: Props) {
  const { error, getInputProps } = useField(name);

  const dataWithDefaultOption = useMemo(
    () => [{ value: '', label: placeholder || 'Selecciona una opción' }, ...data],
    [data, placeholder]
  );

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChange && onChange(event.target.value);
  }

  const inputProps = getInputProps<Omit<MantineNativeSelectProps, 'data'>>({
    id: name,
    onChange: handleChange,
  });

  return (
    <MantineNativeSelect
      name={name}
      error={error}
      data={dataWithDefaultOption}
      {...inputProps}
      {...rest}
    />
  );
}
