import '@/styles/globals.css'
import { trpc } from '@/utils/trpc'
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)
