export type ActionResult<D, E> =
 | { success: true, data: D }
 | { success: false, error: E };
