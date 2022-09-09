import type { MantineThemeOverride } from '@mantine/core';

import { BREAKPOINT } from './constants/breakpoints';

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
  breakpoints: {
    xs: BREAKPOINT.xs,
    sm: BREAKPOINT.sm,
    md: BREAKPOINT.md,
    lg: BREAKPOINT.lg,
    xl: BREAKPOINT.xl,
  },
};
