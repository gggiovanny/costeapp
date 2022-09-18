import { Outlet } from '@remix-run/react';

import RouteContainer from '~/components/RouteContainer';

export default function FixedCosts() {
  return (
    <RouteContainer>
      <Outlet />
    </RouteContainer>
  );
}
