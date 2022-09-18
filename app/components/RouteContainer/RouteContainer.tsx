import { Container } from '@mantine/core';
import { useLocation } from '@remix-run/react';
import { motion } from 'framer-motion';

const MotionContainer = motion(Container);

export default function RouteContainer({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  return (
    <MotionContainer
      key={pathname}
      initial={{ x: '-10%', opacity: 0 }}
      animate={{ x: '0', opacity: 1 }}
      exit={{ y: '-10%', opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </MotionContainer>
  );
}
