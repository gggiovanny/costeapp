import { Menu } from '@mantine/core';
import React from 'react';

import { ButtonsRow, Dropdown } from './ConfirmationButton.styled';

const { Target, Item, Label } = Menu;

type Props = { children: React.ReactNode; message?: React.ReactNode; onClick: () => void };

export default function ConfirmationButton({
  children,
  message = '¿Estas seguro que quieres realizar esta acción?',
  onClick,
}: Props) {
  return (
    <Menu withArrow transition="pop">
      <Target>{children}</Target>
      <Dropdown>
        <Label>{message}</Label>
        <ButtonsRow>
          <Item onClick={onClick} color="red">
            Si
          </Item>
          <Item>No</Item>
        </ButtonsRow>
      </Dropdown>
    </Menu>
  );
}
