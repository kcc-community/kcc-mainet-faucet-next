import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '~/state'
import { AppUpdater } from '../state/updataer'
import { Html, Head } from 'next/document'

import '../styles/globals.css'
import '~/styles/antd.less'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <AppUpdater />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
