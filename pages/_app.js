import { createGlobalStyle } from 'styled-components'

import { Web3ReactProvider } from '@web3-react/core'

import { getLibrary } from '../src/utils/web3-react'
import Web3ReactManager from '../src/utils/web3ReactManager'
import Layout from '../src/components/layouts'
import { MuonProvider } from '../src/context'

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: Montserrat-bold;
  background: #f8f8ff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

@font-face {
  font-family: 'FH Oscar';
  src: url(/fonts/FHOscar-Regular.eot) format('eot'),
    url(/fonts/FHOscar-Regular.ttf) format('turetype'),
    url(/fonts/FHOscar-Regular.woff) format('woff');
}

@font-face {
  font-family: 'Reckless';
  src: url(/fonts/Reckless-Regular.eot) format('eot'),
    url(/fonts/Reckless-Regular.ttf) format('turetype'),
    url(/fonts/Reckless-Regular.woff) format('woff');
}
@font-face {
  font-family: 'Montserrat';
  src: url(/fonts/montserrat-v18-latin-regular.eot) format('eot'),
    url(/fonts/montserrat-v18-latin-regular.ttf) format('turetype'),
    url(/fonts/montserrat-v18-latin-regular.woff) format('woff');
}
@font-face {
  font-family: 'Montserrat-bold';
  src:  url(/fonts/Montserrat-Bold.ttf) format('turetype'),
    url(/fonts/Montserrat-Bold.woff) format('woff');
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.ReactModal__Body--open {
  overflow-y: hidden;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

`
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
