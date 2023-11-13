import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {GeistSans} from 'geist/font/sans'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${GeistSans.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
