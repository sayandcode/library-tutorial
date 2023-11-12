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
export function tryIt<ResultType = any>(fn: ()=> ResultType): ErrorableAction<ResultType> {
  try {
    return {success:true, data:fn() }
  }catch(err){
    return {success: false, msg: JSON.stringify(err)}
  }
}
