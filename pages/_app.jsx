import '../styles/globals.css'
import GlobalCSS from '../styles/styles'
import Head from 'next/head'

function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Kosmiczna encyklopedia układu słonecznego 🚀</title>
      </Head>
      <GlobalCSS />
      <Component {...pageProps}/>
    </>
  )
}

export default App
