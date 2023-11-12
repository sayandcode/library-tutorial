export type ErrorableAction<Data = any, Err = any> = {success:true, data: Data} | {success: false, err: Err}
