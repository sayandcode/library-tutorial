// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import makeDb from '@/db/setup'
import { insertBooks } from '@/db/tables/book/handlers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

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
      const db = makeDb();
      const parsedBody = JSON.parse(req.body);
      let bookData: {}[];
      if(Array.isArray(parsedBody)) bookData = parsedBody;
      else bookData = [parsedBody]
      const insertBooksAction = insertBooks(db, bookData)
      if(!insertBooksAction.success){
        res.status(400).json({msg: insertBooksAction.msg})
        return;
      }
      res.status(201).json({msg: `Successfully created book(s) in database`})
      return;

    default:
      res.status(400).json({msg: "Invalid route"})
  }
}
