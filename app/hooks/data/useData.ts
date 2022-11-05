import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';

export default function <T>(route: string, shouldLoad = true): [T | undefined, boolean] {
  const fetcher = useFetcher<T>();

  useEffect(() => {
    if (shouldLoad && fetcher.type === 'init') {
      fetcher.load(route);
    }
  }, [fetcher, route, shouldLoad]);

  return [fetcher.data, fetcher.state === 'loading'];
}
