import { Center, Navbar, Stack } from '@mantine/core';
import { Link, useLocation } from '@remix-run/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import Logo from '~/components/Logo';
import useDarkMode from '~/styles/hooks/useDarkMode';

import { LINKS } from './constants';
import SidebarButton from './SidebarButton';
import SidebarLink from './SidebarLink';

const { Section } = Navbar;

export default function Sidebar() {
  const { isDarkModeOn, toggleDarkMode } = useDarkMode();

  const { pathname } = useLocation();

  return (
    <Navbar width={{ base: 80 }} p="md">
      <Center>
        <Link to="/">
          <Logo />
        </Link>
      </Center>
      <Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {LINKS.map(link => (
            <SidebarLink {...link} key={link.label} isActive={pathname?.includes(link.route)} />
          ))}
        </Stack>
      </Section>
      <Section>
        <SidebarButton
          label={isDarkModeOn ? 'Activar modo claro' : 'Activar modo oscuro'}
          Icon={isDarkModeOn ? MdLightMode : MdDarkMode}
          onClick={toggleDarkMode}
        />
      </Section>
    </Navbar>
  );
}
