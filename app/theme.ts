import type { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  components: {
    Center: {
      defaultProps: {
        style: { height: '100%' },
      },
    },
    Container: {
      defaultProps: {
        style: { height: '100%' },
      },
    },
  },
};
