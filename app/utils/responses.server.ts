import { json } from '@remix-run/node';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function unexpectedError(error: unknown, errorCode = 500) {
  return json<{ unexpectedError: string }>({ unexpectedError: getErrorMessage(error) }, errorCode);
}
