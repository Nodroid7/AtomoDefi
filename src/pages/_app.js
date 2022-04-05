import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'
import LocalStorageContextProvider, { Updater as LocalStorageContextUpdater } from '../contexts/LocalStorage'

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    Fathom.load('OANJVQNZ', {
      includedDomains: ['defiAtomo.com', 'www.defiAtomo.com'],
      url: 'https://gold-six.Atomo.fi/script.js',
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  return (
    <LocalStorageContextProvider>
      <LocalStorageContextUpdater />
      <Component {...pageProps} />
    </LocalStorageContextProvider>
  )
}

export default App
