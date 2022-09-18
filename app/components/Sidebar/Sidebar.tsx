import { Center, Navbar, Stack } from '@mantine/core';
import { Link, useLocation } from '@remix-run/react';
import { MdAttachMoney } from 'react-icons/md';

import Logo from '~/components/Logo';
import { FIXED_COSTS_ROUTE } from '~/routes/fixed-costs/constants';

import SidebarLink from './SidebarLink';

const { Section } = Navbar;

const links = [{ route: FIXED_COSTS_ROUTE, label: 'Costos fijos', Icon: MdAttachMoney }];

export default function Sidebar() {
  const location = useLocation();

  const activeRoute = location.pathname;

  return (
    <Navbar width={{ base: 80 }} p="md">
      <Center>
        <Link to="/">
          <Logo />
        </Link>
      </Center>
      <Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links.map(link => (
            <SidebarLink {...link} key={link.label} isActive={activeRoute?.includes(link.route)} />
          ))}
        </Stack>
      </Section>
    </Navbar>
  );
}
