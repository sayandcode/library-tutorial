export type ErrorRes = {
  msg: string
}

export type PostRes = {
  msg: string
}

export type GetRes = {
  data: unknown
}

export type ApiRes = GetRes | PostRes | ErrorRes;
