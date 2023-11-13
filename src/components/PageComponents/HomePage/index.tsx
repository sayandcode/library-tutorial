import Link from 'next/link'

function HomePage() {
  return (
    <main
      className="flex flex-col items-center pt-16"
    >
      <h1 className="font-bold text-4xl mb-8">My Library</h1>
      <Link href="/book/create" className='underline'>Add a new book</Link>
    </main>
  )
}

export default HomePage;
