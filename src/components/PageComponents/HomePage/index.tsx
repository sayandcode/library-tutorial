import Link from 'next/link'
import { BookTableItem } from '@/db/tables/book/schema';
import BookCard from './Subcomponents/BookCard';

function HomePage({ booksArr }: { booksArr: BookTableItem[] }) {
  return (
    <main
      className="flex flex-col items-center pt-16"
    >
      <h1 className="font-bold text-4xl mb-4">My Library</h1>
      <Link href="/book/create" className='underline mb-4'>Add a new book</Link>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 px-4 w-full">
        {booksArr.map((book) => (
          <li key={book.id}>
            <BookCard {...book} />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default HomePage;
