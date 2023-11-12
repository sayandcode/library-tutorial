import { Toaster } from '@/components/ui/toaster'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center pt-16 ${inter.className}`}
    >
      <h1 className="font-bold text-4xl mb-8">My Library</h1>
      <Link href="/book/create" className='underline'>Add a new book</Link>
    </main>
  )
}
