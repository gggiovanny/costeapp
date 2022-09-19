import { createStyles } from '@mantine/core';

import getDefaultBackgroundColor from '../utils/getDefaultBackgroundColor';

export default createStyles(theme => ({
  top: {
    position: 'sticky',
    insetBlockStart: 0,
    zIndex: 2,
    backgroundColor: getDefaultBackgroundColor(theme),
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  topShadow: {
    boxShadow: theme.shadows.sm,
  },

  bottom: {
    position: 'sticky',
    insetBlockEnd: 0,
    backgroundColor: getDefaultBackgroundColor(theme),
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  bottomShadow: {
    boxShadow: `0 -1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px -10px 15px -5px,
    rgb(0 0 0 / 4%) 0px -7px 7px -5px`,
  },
}));
