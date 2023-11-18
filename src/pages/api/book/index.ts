import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRes } from '../types';
import makeDb from '@/db/setup';
import { getBooks, insertBooks } from '@/db/tables/book/handlers';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiRes>
) {
  const db = makeDb();
  switch (req.method) {
    case 'GET':
      const getAllBooksAction = await getBooks(db);
      if (!getAllBooksAction.success) {
        console.error(getAllBooksAction.err);
        res.status(500).json({ msg: "Could not fetch books. Try again later" })
        return
      }
      const bookDataForGet = getAllBooksAction.data;
      res.status(200).json({ data: bookDataForGet })
      return;

    case 'POST':
      let bookDataForPost: {}[];
      if (Array.isArray(req.body)) bookDataForPost = req.body;
      else if (typeof req.body === 'object' && req.body !== null) bookDataForPost = [req.body]
      else {
        res.status(400).json({ msg: "The body should either be an object or an array of objects" });
        return;
      }
      const insertBooksAction = await insertBooks(db, bookDataForPost)
      if (!insertBooksAction.success) {
        res.status(400).json({ msg: JSON.stringify(insertBooksAction.err) })
        return;
      }
      res.status(201).json({ msg: `Successfully created book(s) in database` })
      return;

    default:
      res.status(400).json({ msg: "Invalid route" })
  }
}
