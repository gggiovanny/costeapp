import { ClientProvider as MantineClientProvider } from '@mantine/remix';
import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(
  document,
  <MantineClientProvider>
    <RemixBrowser />
  </MantineClientProvider>
);
