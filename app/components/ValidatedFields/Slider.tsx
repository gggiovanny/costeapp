import type { SliderProps as MantineSliderProps } from '@mantine/core';
import { Slider as MantineSlider, Stack, Text } from '@mantine/core';
import { useField } from 'remix-validated-form';

export default function Slider({ name = '', ...rest }: MantineSliderProps) {
  const { error, getInputProps } = useField(name);

  return (
    <Stack>
      <MantineSlider name={name} {...getInputProps({ id: name })} {...rest} />
      {error && <Text color="red">{error}</Text>}
    </Stack>
  );
}
