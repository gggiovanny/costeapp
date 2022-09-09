import { Modal } from '@mantine/core';

import useGoBack from '~/hooks/useGoBack';
import useIsMobile from '~/styles/hooks/useIsMobile';

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function ContentCard({ title, children }: Props) {
  const goBack = useGoBack();
  const isMobile = useIsMobile();

  return (
    <Modal title={title} onClose={goBack} opened fullScreen={isMobile}>
      {children}
    </Modal>
  );
}
