import { ChainMap } from './chainsMap'

export const validChains = {
  local: [ChainMap.MATIC_TESTNET, ChainMap.BSC_TESTNET],
  dev: [ChainMap.ARB, ChainMap.OPTIMISM, ChainMap.ETH],
  production: [ChainMap.ARB, ChainMap.OPTIMISM],
}

let tokens = [
  {
    chainId: 1,
    address: '0x38cC8863fe8FEfaa859198B49dcA4c68cdabec94',
    name: 'ERC404m',
    symbol: 'ERC404m',
    decimals: 18,
    logo: '/media/tokens/bt.svg',
    balance: 0,
  },
  {
    chainId: 10,
    address: '0x15A1F0B6e5A01935C1276B3338A614fF08fC91DC',
    name: 'ERC404m',
    symbol: 'ERC404m',
    decimals: 18,
    logo: '/media/tokens/bt.svg',
    balance: 0,
  },
  {
    chainId: 42161,
    address: '0x15A1F0B6e5A01935C1276B3338A614fF08fC91DC',
    name: 'ERC404m',
    symbol: 'ERC404m',
    decimals: 18,
    logo: '/media/tokens/bt.svg',
    balance: 0,
  },
]

export default tokens

export const ChainGraphMap = {
  [ChainMap.BSC_TESTNET]: process.env.NEXT_PUBLIC_BSC_TESTNET_GRAPH_URL,
  [ChainMap.MATIC_TESTNET]: process.env.NEXT_PUBLIC_MATIC_TESTNET_GRAPH_URL,
  [ChainMap.OPTIMISM]: process.env.NEXT_PUBLIC_OPTIMISM_GRAPH_URL,
  [ChainMap.ARB]: process.env.NEXT_PUBLIC_ARB_GRAPH_URL,
  [ChainMap.ETH]: process.env.NEXT_PUBLIC_ETH_GRAPH_URL,
}
