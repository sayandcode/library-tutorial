import Link from 'next/link'
import { BookTableItem } from '@/db/tables/book/schema';

function HomePage({ booksArr }: { booksArr: BookTableItem[] }) {
  return (
    <main
      className="flex flex-col items-center pt-16"
    >
      <h1 className="font-bold text-4xl mb-8">My Library</h1>
      <Link href="/book/create" className='underline'>Add a new book</Link>
      {booksArr.map((book)=>(
        <div>
          {book.title}
        </div>
      ))}
    </main>
  )
}

export default HomePage;
