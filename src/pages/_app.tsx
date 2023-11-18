import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {GeistSans} from 'geist/font/sans'
import { Toaster } from '@/components/ui/toaster';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      {/* This way makes sure the style is set globally i.e. also to react portals */}
      <style jsx global>{`
        html {
          font-family: ${GeistSans.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <Toaster />
    </div>
  )
}
