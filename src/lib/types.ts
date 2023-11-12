export type ErrorableAction<D = any> = {success:true, data: D} | {success: false, msg: string}
