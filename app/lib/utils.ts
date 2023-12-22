import { type ClassValue, clsx } from 'clsx';
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
