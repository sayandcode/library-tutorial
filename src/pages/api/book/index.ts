import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRes } from '../types';
import makeDb from '@/db/setup';
import { getAllBooks } from '@/db/tables/book/handlers';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiRes>
) {
  switch (req.method) {
    case 'GET':
      const db = makeDb();
      const getAllBooksAction = await getAllBooks(db);
      if (!getAllBooksAction.success) {
        console.error(getAllBooksAction.err);
        res.status(500).json({ msg: "Could not fetch books. Try again later" })
        return
      }
      const bookData = getAllBooksAction.data;
      res.status(200).json({ data: bookData })
      return;

    default:
      res.status(400).json({ msg: "Invalid route" })
  }
}
