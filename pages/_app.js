import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'

import { getLibrary } from '../src/utils/web3-react'
import Web3ReactManager from '../src/utils/web3ReactManager'
import Layout from '../src/components/layouts'
import GlobalStyle from '../styles/GlobalStyle'
import { store } from '../src/state'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <GlobalStyle />

        <Web3ReactManager>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3ReactManager>
      </Web3ReactProvider>
    </Provider>
  )
}

export default MyApp
