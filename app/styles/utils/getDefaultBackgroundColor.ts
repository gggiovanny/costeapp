import type { Theme } from '@emotion/react';

export default function (theme: Theme) {
  return theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white;
}
