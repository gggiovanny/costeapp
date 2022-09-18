import { Tooltip, UnstyledButton } from '@mantine/core';
import { Link } from '@remix-run/react';
import type { IconType } from 'react-icons';

import useStyles from './useStyles';

interface Props {
  route: string;
  label: string;
  Icon: IconType;
  isActive?: boolean;
}

export default function SidebarLink({ Icon, label, isActive, route }: Props) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        component={Link}
        to={route}
        className={cx(classes.link, { [classes.active]: isActive })}
      >
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
}
