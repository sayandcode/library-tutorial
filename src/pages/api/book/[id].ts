import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRes } from '../types';
import makeDb from '@/db/setup';
import { deleteBook } from '@/db/tables/book/handlers';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiRes>
) {
  switch (req.method) {
    case 'DELETE':
      const bookIdStr = req.query.id;
      const isBookIdValid = typeof bookIdStr === 'string' && Number.isInteger(parseFloat(bookIdStr));
      if (!isBookIdValid) {
        res.status(400).json({ msg: "Book ID should be a valid integer" })
        return;
      }
      const db = makeDb();
      const bookId = parseInt(bookIdStr)
      const deleteBookAction = await deleteBook(db, bookId);
      if (!deleteBookAction.success) {
        console.error(deleteBookAction.err);
        res.status(500).json({ msg: "Could not delete book. Try again later" })
        return
      }
      const bookData = deleteBookAction.data;
      res.status(200).json({ data: bookData })
      return;

    default:
      res.status(400).json({ msg: "Invalid route" })
  }
}
