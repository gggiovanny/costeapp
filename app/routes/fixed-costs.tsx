import { Container } from '@mantine/core';
import { Outlet } from '@remix-run/react';

export default function FixedCosts() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
