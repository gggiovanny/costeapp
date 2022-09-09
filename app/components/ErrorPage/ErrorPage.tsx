import { Button, Center, Code, Stack, Title } from '@mantine/core';

import useGoBack from '~/hooks/useGoBack';

type Props = {
  title?: string;
  error?: Error;
};

export default function ErrorPage({ title = 'Chale, ha ocurrido un error', error }: Props) {
  const goBack = useGoBack();

  return (
    <Center>
      <Stack align={'center'}>
        <Title order={1}>{title}</Title>
        {error && <Code block>{error.message}</Code>}
        <Button onClick={goBack}>Regresar</Button>
      </Stack>
    </Center>
  );
}
