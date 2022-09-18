import { Outlet } from '@remix-run/react';
import { AnimatePresence } from 'framer-motion';

export default function AnimatedOutlet() {
  return (
    <AnimatePresence initial={false} mode="wait">
      <Outlet />
    </AnimatePresence>
  );
}
