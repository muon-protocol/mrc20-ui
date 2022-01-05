import { Web3ReactProvider } from '@web3-react/core'

import { getLibrary } from '../src/utils/web3-react'
import Web3ReactManager from '../src/utils/web3ReactManager'
import Layout from '../src/components/layouts'
import { MuonProvider } from '../src/context'
import GlobalStyle from '../styles/GlobalStyle'

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <GlobalStyle />

      <Web3ReactManager>
        <MuonProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MuonProvider>
      </Web3ReactManager>
    </Web3ReactProvider>
  )
}

export default MyApp
