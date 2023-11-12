export type ErrorableAction<Data = unknown, Err = unknown> = {success:true, data: Data} | {success: false, err: Err}
