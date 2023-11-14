// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import makeDb from '@/db/setup'
import { insertBooks } from '@/db/tables/book/handlers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRes } from '../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiRes>
) {
  switch(req.method){
    case 'POST': 
      let bookData: {}[];
      if(Array.isArray(req.body)) bookData = req.body;
      else if (typeof req.body === 'object' && req.body !== null) bookData = [req.body]
      else {
        res.status(400).json({msg: "The body should either be an object or an array of objects"});
        return;
      }
      const db = makeDb();
      const insertBooksAction = await insertBooks(db, bookData)
      if(!insertBooksAction.success){
        res.status(400).json({msg: JSON.stringify(insertBooksAction.err)})
        return;
      }
      res.status(201).json({msg: `Successfully created book(s) in database`})
      return;

    default:
      res.status(400).json({msg: "Invalid route"})
  }
}
