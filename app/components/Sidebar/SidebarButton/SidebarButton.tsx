import { Tooltip, UnstyledButton } from '@mantine/core';
import type { IconType } from 'react-icons';

import useSidebarButtonStyles from '../useSidebarButtonStyles';

interface Props {
  onClick: () => void;
  label: string;
  Icon: IconType;
  isActive?: boolean;
}

export default function SidebarLink({ Icon, label, isActive, onClick }: Props) {
  const { classes, cx } = useSidebarButtonStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        className={cx(classes.link, { [classes.active]: isActive })}
        onClick={onClick}
      >
        <Icon size={24} />
      </UnstyledButton>
    </Tooltip>
  );
}
