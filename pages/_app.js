import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { NextUIProvider } from '@nextui-org/react';
// import { Home } from 'react-iconly'

function MyApp({ Component, pageProps }) {
  return (
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
  )
}

export default MyApp
