import styled from '@emotion/styled';
import { Menu } from '@mantine/core';

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};

  * {
    width: auto;
  }
`;

export const Dropdown = styled(Menu.Dropdown)`
  [data-menu-dropdown] {
    display: flex;
    flex-wrap: wrap;
  }
`;
