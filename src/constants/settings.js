import { ChainMap } from './chainsMap'

export const validChains = {
  local: [ChainMap.ROPSTEN, ChainMap.RINKEBY, ChainMap.BSC_TESTNET],
  dev: [ChainMap.BSC_TESTNET, ChainMap.MATIC_TESTNET],
  production: [ChainMap.ETH, ChainMap.BSC],
}

let tokens = [
  {
    chainId: 97,
    address: '0x4C3B9fC9d7EB7dAb6BE92aA4f9f666A09994Eb51',
    name: 'BloodToken',
    symbol: 'TMRC20',
    decimals: 18,
    logo: '/media/tokens/bt.svg',
    balance: 0,
  },
  {
    chainId: 80001,
    address: '0x20AD4EDdfaAD9A57BeB5ae86a40cD73faEADAF10',
    name: 'BloodToken',
    symbol: 'TMRC20',
    decimals: 18,
    logo: '/media/tokens/bt.svg',
    balance: 0,
  },
  // {
  //   chainId: 4002,
  //   address: '0xA093B771F127FbBdbd2e2E722Aa2ee01F361384c',
  //   name: 'BloodToken',
  //   symbol: 'BT',
  //   decimals: 18,
  //   logo: '/media/tokens/bt.svg',
  //   balance: 0,
  // },
]

export default tokens

export const ChainGraphMap = {
  [ChainMap.BSC_TESTNET]: process.env.NEXT_PUBLIC_BSC_TESTNET_GRAPH_URL,
  [ChainMap.MATIC_TESTNET]: process.env.NEXT_PUBLIC_MATIC_TESTNET_GRAPH_URL,
}
