import { useIdle } from '@mantine/hooks';
import type { FormMethod } from '@remix-run/react';
import { useFetcher } from '@remix-run/react';
import dayjs from 'dayjs';
import { get, isEmpty } from 'lodash';
import { useEffect } from 'react';
import type { TouchedFields } from 'remix-validated-form';
import { useFormContext } from 'remix-validated-form';

/**
 * Inspired by https://www.npmjs.com/package/react-autosave
 */

const idleTimeoutInMs = 1000 * 5; // 5 seconds
const identifierKey = 'id';
const submitMethod: FormMethod = 'post';

export const LAST_SAVED_DATE_KEY = 'lastSaveDate';

const getIdPath = (fieldNamePath: string) => fieldNamePath.replace(/(\.\w+)$/, `.${identifierKey}`);
const indexRegex = /\[(\d+)\]/;

const getIndex = (fieldNamePath: string) => {
  const matchs = fieldNamePath.match(indexRegex) ?? [];
  return matchs.at(-1) ?? '0';
};

const replaceIndex = (fieldNamePath: string, currentIndex: string, newIndex: string) =>
  newIndex === currentIndex ? fieldNamePath : fieldNamePath.replace(indexRegex, `[${newIndex}]`);

const createFormDataFromTouched = <T>(touchedFields: TouchedFields, data: T) => {
  const newIndexes = Array.from(
    new Set(Object.keys(touchedFields).map(fieldNamePath => getIndex(fieldNamePath)))
  ).reduce(
    (acc, originalIndex, arrayIndex) => ({
      ...acc,
      [originalIndex]: arrayIndex.toString(),
    }),
    {}
  );

  const formData = new FormData();

  Object.entries(touchedFields).forEach(([fieldNamePath, isTouched]) => {
    if (!isTouched) return;

    const idPath = getIdPath(fieldNamePath);
    const currentIndex = getIndex(fieldNamePath);
    const newIndex = newIndexes[currentIndex as keyof typeof newIndexes];

    formData.set(replaceIndex(idPath, currentIndex, newIndex), get(data, idPath, ''));
    formData.set(
      replaceIndex(fieldNamePath, currentIndex, newIndex),
      get(data, fieldNamePath, '').toString()
    );
  });

  return formData;
};

export default function <T>(formId: string) {
  const { submit, touchedFields } = useFormContext(formId);
  const fetcher = useFetcher();
  const isIdle = useIdle(idleTimeoutInMs, { initialState: false, events: ['keypress', 'click'] });

  const lastSaveDate = fetcher.data?.[LAST_SAVED_DATE_KEY];
  const savedStatusMessage = lastSaveDate ? `Guardado ${dayjs(lastSaveDate).fromNow()}` : undefined;

  useEffect(() => {
    if (isIdle) {
      submit();
    }
  }, [isIdle, submit]);

  function submitOnlyTouchedFields(data: T, event: React.FormEvent<HTMLFormElement>) {
    // prevents the default full form data submit
    event.preventDefault();

    // prevents a request when there isn't touched fields
    if (isEmpty(touchedFields)) return;

    fetcher.submit(createFormDataFromTouched(touchedFields, data), { method: submitMethod });
  }

  return {
    savedStatusMessage,
    validatedFormProps: {
      id: formId,
      method: submitMethod,
      onSubmit: submitOnlyTouchedFields,
      // sets all values back to default and clears all errors and touched states
      resetAfterSubmit: true,
      fetcher,
    },
    saveButtonProps: {
      loading: fetcher.state === 'submitting',
      onClick: submit,
    },
  };
}
