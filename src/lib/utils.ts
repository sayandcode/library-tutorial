import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ErrorableAction } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * This utility function runs the provided function inside a try-catch block, and gives an `ErrorableAction` type result
 * @param fn The function which is run inside the try-catch block
 */
export function tryIt<ResultType = any>(fn: () => ResultType): ErrorableAction<ResultType> {
  try {
    return { success: true, data: fn() }
  } catch (err) {
    return { success: false, err }
  }
}

/**
 * This utility function runs the provided async function inside a try-catch block, and gives an `ErrorableAction` type result
 * @param fn The function which is run inside the try-catch block
 */
export async function tryItAsync<ResultType = any>(fn: () => Promise<ResultType>): Promise<ErrorableAction<ResultType>> {
  try {
    return { success: true, data: await fn() }
  } catch (err) {
    return { success: false, err }
  }
}

/**
 * This function checks whether the provided string is a JSON stringified object or not
 */
export function getIsJsonObj(str: string) {
  try {
    var o = JSON.parse(str);
    if (o && typeof o === "object") {
      return true;
    }
  }
  catch { }
  return false;
};
