import { Outlet } from '@remix-run/react';

import RouteContainer from '~/components/RouteContainer';

export default function Supplies() {
  return (
    <RouteContainer>
      <Outlet />
    </RouteContainer>
  );
}
