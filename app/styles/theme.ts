import type { MantineThemeOverride } from '@mantine/core';

import { DAYJS_LOCALE } from '~/constants/locales';

import { BREAKPOINT } from './constants/breakpoints';

export const theme: MantineThemeOverride = {
  primaryColor: 'pink',
  datesLocale: DAYJS_LOCALE,
  components: {
    Container: {
      defaultProps: {},
    },
    Modal: {
      styles: {
        title: {
          fontWeight: 500,
        },
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
