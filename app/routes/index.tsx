import { Center, Text } from '@mantine/core';

import RouteContainer from '~/components/RouteContainer';

export default function Index() {
  return (
    <RouteContainer>
      <Center sx={{ height: '100%' }}>
        <Text>Bienvendid@ a Costeapp 👩‍🍳🚀</Text>
      </Center>
    </RouteContainer>
  );
}
