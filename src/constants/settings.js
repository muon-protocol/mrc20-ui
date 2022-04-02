import { ChainMap } from './chainsMap'

export const validChains = [3, 4, 97]

let tokens = [
  {
    chainId: 3,
    address: '0xA093B771F127FbBdbd2e2E722Aa2ee01F361384c',
    name: 'BloodToken',
    symbol: 'BT',
    decimals: 18,
    logo: '/media/tokens/bt.svg',
    balance: 0,
  },
  {
    chainId: 4,
    address: '0xc3b99c2a46b8DC82C96B8b61ED3A4c5E271164D7',
    name: 'BloodToken',
    symbol: 'BT',
    decimals: 18,
    logo: '/media/tokens/bt.svg',
    balance: 0,
  },
  {
    chainId: 97,
    address: '0x987Dcd895948c476654792d92f282A256099EA02',
    name: 'BloodToken',
    symbol: 'BT',
    decimals: 18,
    logo: '/media/tokens/bt.svg',
    balance: 0,
  },
  // {
  //   chainId: 80001,
  //   address: '0xC879CE4DB4AeD72E1ad243A2F9d775e60BED0D33',
  //   name: 'BloodToken',
  //   symbol: 'BT',
  //   decimals: 18,
  //   logo: '/media/tokens/bt.svg',
  //   balance: 0,
  // },
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
  [ChainMap.RINKEBY]: process.env.NEXT_PUBLIC_RINKEBY_GRAPH_URL,
  [ChainMap.ROPSTEN]: process.env.NEXT_PUBLIC_ROPSTEN_GRAPH_URL,
  [ChainMap.BSC_TESTNET]: process.env.NEXT_PUBLIC_BSC_TESTNET_GRAPH_URL,
}
