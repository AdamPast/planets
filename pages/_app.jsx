import '../styles/globals.css'
import GlobalCSS from '../styles/styles'


function MyApp({Component, pageProps}) {
  return (
    <>
      <GlobalCSS />
      <Component {...pageProps}/>
    </>
  )
}

export default MyApp
