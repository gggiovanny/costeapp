import { useNavigate } from '@remix-run/react';

export default function () {
  const navigate = useNavigate();
  return () => navigate('..');
}
