import { useIdle } from '@mantine/hooks';
import { useFetcher } from '@remix-run/react';
import { useEffect, useRef } from 'react';

/**
 * Inspired by https://www.npmjs.com/package/react-autosave
 */

const idleTimeoutInMs = 1000 * 5; // 5 seconds

export default function <T>() {
  const formRef = useRef(null);
  const isIdle = useIdle(idleTimeoutInMs, { initialState: false, events: ['keypress', 'click'] });
  const fetcher = useFetcher<T>();
  const { submit } = fetcher;

  useEffect(() => {
    if (isIdle) {
      submit(formRef.current);
    }
  }, [isIdle, submit]);

  return { formRef, fetcher };
}
