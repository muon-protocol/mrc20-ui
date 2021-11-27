import Web3 from 'web3'

const bscTestWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://data-seed-prebsc-1-s1.binance.org:8545/'
  )
)

const ethWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  )
)
const rinkebyWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  )
)

const ftmTestWeb3 = new Web3(
  new Web3.providers.HttpProvider('https://rpc.testnet.fantom.network/')
)

const ropstenWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  )
)
const mumbai = new Web3(
  new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/')
)

export const chains = [
  { id: 3, name: 'Ropsten', symbol: 'ETH', web3: ropstenWeb3 },
  // { id: 1, name: 'Ethereum', symbol: 'ETH', web3: ethWeb3 },
  // { id: 4, name: 'Rinkeby', symbol: 'ETH', web3: rinkebyWeb3 },
  // { id: 56, name: 'Smart Chain', symbol: 'BSC', icon: 'bsc.svg' },
  // {
  //   id: 97,
  //   name: 'BSCTest',
  //   symbol: 'BSC',
  //   web3: bscTestWeb3
  // }
  // { id: 250, name: 'Fantom', symbol: 'FTM', icon: 'ftm.svg' },
  // {
  //   id: 4002,
  //   name: 'FTMTest',
  //   symbol: 'FTM',
  //   web3: ftmTestWeb3
  // },
  {
    id: 80001,
    name: 'MATIC MUMBAI',
    symbol: 'MATIC',
    web3: mumbai,
    icon: 'matic.svg'
  }
]

// TODO add other chains
export const validChains = [3, 80001]
