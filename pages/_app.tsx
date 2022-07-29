import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '~/state'
import { AppUpdater } from '../state/updataer'

import '~/styles/antd.less'
import '../styles/globals.css'

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
