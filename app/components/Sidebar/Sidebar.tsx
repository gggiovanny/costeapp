import { Group, Navbar, Text } from '@mantine/core';
import { Link, useMatches } from '@remix-run/react';
import { MdAttachMoney } from 'react-icons/md';

import Logo from '~/components/Logo';

import useStyles from './useStyles';

const { Section } = Navbar;

const links = [{ route: '/costos-fijos', label: 'Costos fijos', Icon: MdAttachMoney }];

export default function Sidebar() {
  const { classes, cx } = useStyles();
  const matches = useMatches();

  const activeRoute = matches.at(-1)?.pathname;

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Section grow>
        <Link to="/">
          <Group className={classes.header} position="left">
            <Logo />
            <Text size="xl" weight={700} color="white">
              Costeapp
            </Text>
          </Group>
        </Link>
        {links.map(({ label, route, Icon }) => (
          <Link
            className={cx(classes.link, { [classes.linkActive]: route === activeRoute })}
            key={label}
            to={route}
          >
            <Icon className={classes.linkIcon} size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </Section>
    </Navbar>
  );
}
