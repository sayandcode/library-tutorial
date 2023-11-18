import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiRes } from '../types';
import makeDb from '@/db/setup';
import { deleteBook, getBooks } from '@/db/tables/book/handlers';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiRes>
) {
  const bookIdStr = req.query.id;
  const isBookIdValid = typeof bookIdStr === 'string' && Number.isInteger(parseFloat(bookIdStr));
  if (!isBookIdValid) {
    res.status(400).json({ msg: "Book ID should be a valid integer" })
    return;
  }

  const db = makeDb();
  const bookId = parseInt(bookIdStr)
  switch (req.method) {
    case 'GET': 
      const getBookAction = await getBooks(db, [bookId]);
      if(!getBookAction.success){
        res.status(500).json({msg: "Could not fetch book"})
        return;
      }

      const bookDataForGetReq = getBookAction.data[0];
      if(!bookDataForGetReq) {
        res.status(404).json({msg: "The requested book doesn't exist in our records"})
        return;
      }
      res.status(200).json({data: bookDataForGetReq});
      return;

    case 'DELETE':
      const deleteBookAction = await deleteBook(db, bookId);
      if (!deleteBookAction.success) {
        console.error(deleteBookAction.err);
        res.status(500).json({ msg: "Could not delete book. Try again later" })
        return;
      }
      const bookDataForDelReq = deleteBookAction.data;
      res.status(200).json({ data: bookDataForDelReq })
      return;

    default:
      res.status(400).json({ msg: "Invalid route" })
  }
}
