import { AppShell, MantineProvider } from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import React from 'react';

import faviconUrl from './assets/favicon.ico';
import AnimatedOutlet from './components/AnimatedOutlet';
import ErrorPage from './components/ErrorPage';
import Sidebar from './components/Sidebar';
import globalStylesUrl from './styles/global.css';
import { theme } from './styles/theme';
import configureDayJS from './utils/configureDayJS';

configureDayJS();

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

function Document({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <head>
          <Meta />
          <Links />
          <StylesPlaceholder />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}

export default function App() {
  return (
    <Document>
      <AppShell navbar={<Sidebar />}>
        <AnimatedOutlet />
      </AppShell>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <ErrorPage error={error} />
    </Document>
  );
}
