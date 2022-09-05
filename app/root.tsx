import { AppShell, MantineProvider } from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import faviconUrl from './assets/favicon.ico';
import Sidebar from './components/Sidebar';
import globalStylesUrl from './styles/global.css';
import { theme } from './theme';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Costeapp',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: globalStylesUrl,
  },
  {
    rel: 'icon',
    href: faviconUrl,
  },
];

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <html lang="en">
        <head>
          <Meta />
          <Links />
          <StylesPlaceholder />
        </head>
        <body>
          <AppShell navbar={<Sidebar />}>
            <Outlet />
          </AppShell>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
