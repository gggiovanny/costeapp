import type { NumberInputProps } from '@mantine/core';
import { createStyles, NumberInput, Slider, Text } from '@mantine/core';
import { useControlField, useField } from 'remix-validated-form';

const useStyles = createStyles(theme => ({
  wrapper: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 22,
    paddingBottom: 3,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },

  slider: {
    position: 'relative',
    width: '100%',
    bottom: 2,
  },

  thumb: {
    width: 16,
    height: 16,
  },

  track: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },
}));

type Props = Omit<NumberInputProps, 'icon' | 'description'> & {
  name: string;
};

export default function SliderInput({ name, min, max, step, ...rest }: Props) {
  const { classes } = useStyles();
  const { error, getInputProps, validate } = useField(name);

  const [value, setValue] = useControlField<number | undefined>(name);

  const { onChange, ...inputProps } = getInputProps<NumberInputProps>({ id: name });

  function handleChange(newValue: number | undefined) {
    onChange && onChange(newValue);
    setValue(newValue);
    validate();
  }

  return (
    <div className={classes.wrapper}>
      <NumberInput
        value={value}
        onChange={handleChange}
        step={step}
        min={min}
        max={max}
        hideControls
        classNames={{ input: classes.input, label: classes.label }}
        name={name}
        {...inputProps}
        {...rest}
      />
      <Slider
        step={step}
        min={min}
        max={max}
        label={null}
        value={value}
        onChange={handleChange}
        size={2}
        radius={0}
        className={classes.slider}
        classNames={{ thumb: classes.thumb, track: classes.track }}
      />
      {error && (
        <Text color="red" size="xs" mt="xs">
          {error}
        </Text>
      )}
    </div>
  );
}
