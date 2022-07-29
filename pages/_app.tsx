import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '~/state'
import { AppUpdater } from '../state/updataer'

import '../styles/globals.css'
import '~/styles/antd.less'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {typeof window === 'undefined' && (
          <style
            id="holderStyle"
            dangerouslySetInnerHTML={{
              __html: `
         *, *::before, *::after {
           transition: none!important;
         }
         `,
            }}
          />
        )}
      </Head>
      <Provider store={store}>
        <AppUpdater />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
