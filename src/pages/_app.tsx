import type { AppProps } from 'next/app'
import Head from 'next/head'
import './globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Game of Life 3D</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
        />
      </Head>

      <Component {...pageProps} />
    </>
  )
}
