import type { ButtonProps } from '@mantine/core';
import { Button } from '@mantine/core';
import { useIsSubmitting } from 'remix-validated-form';

export default function SubmitButton({ children, ...rest }: ButtonProps) {
  const isSubmitting = useIsSubmitting();

  return (
    <Button type="submit" loading={isSubmitting} {...rest}>
      {children}
    </Button>
  );
}
