export type ActionResult<D, E> =
 | { success: true, data: D }
 | { success: false, error: E };

export type FormErrorRecord<FieldNames extends string> =
  Record<FieldNames, string | null>;
