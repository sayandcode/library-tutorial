// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type ErrorRes = {
  msg: string
}

type PostRes = {
  name: string
}

type Res = PostRes | ErrorRes;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  switch(req.method){
    case 'POST': 
      console.log()
      res.status(200).json({msg: `Received new book details ${req.body}`})
      break;

    default:
      res.status(400).json({msg: "Invalid route"})
  }
}
