import { Inter } from 'next/font/google'
import { trpc } from '@/utils/trpc'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const hello = trpc.hello.useQuery({text: 'sayand'});

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {hello.data?.greeting || 'Loading...'}
    </main>
  )
}
