import '../styles/globals.css'
import { MobiProvider } from '../context/mobiContext'

function MyApp({ Component, pageProps }) {
  return ( 
  <MobiProvider>
  <Component {...pageProps} />
  </MobiProvider>
  )
}

export default MyApp
