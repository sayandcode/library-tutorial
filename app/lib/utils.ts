import { type ClassValue, clsx } from 'clsx';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * This function returns a promise that resolves in the time specified as
 * an argument
 *
 * @param ms {string} Time to sleep in milliseconds
 */
export async function sleep(ms: number) {
  await new Promise((res) => {
    setTimeout(res, ms);
  });
}

/**
 * Creates el ids for each form element whose name is passed in the input array
 * @param formFieldsArr {string} Array of names of the required form fields
 */
export function useFormElIds
<FieldNames extends string>(formFieldsArr: FieldNames[]):
Record<FieldNames, { main: string, description: string }> {
  const id = useId();
  const entries = formFieldsArr
    .map(
      fieldName => [
        fieldName,
        { main: `${id}-${fieldName}-main`,
          description: `${id}-${fieldName}-description` },
      ] as [FieldNames, { main: string, description: string }]);
  return getTypedObjectFromEntries(entries);
}

/**
 * This returns a typesafe object based on the entries passed to it
  * @param entries The array of object entries
  */
export function getTypedObjectFromEntries<
  KeyName extends string, Value,
>(entries: [KeyName, Value][]) {
  return Object.fromEntries(entries) as Record<KeyName, Value>;
}
