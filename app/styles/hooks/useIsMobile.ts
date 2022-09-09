import { useMediaQuery } from '@mantine/hooks';

import { BREAKPOINT } from '../constants/breakpoints';

export default function () {
  return useMediaQuery(`(max-width: ${BREAKPOINT.sm}px)`);
}
