import { ChainMap } from './chainsMap'

export const validChains = {
  local: [ChainMap.ROPSTEN, ChainMap.RINKEBY, ChainMap.BSC_TESTNET],
  dev: [ChainMap.ROPSTEN, ChainMap.RINKEBY, ChainMap.BSC_TESTNET],
  production: [ChainMap.ETH, ChainMap.BSC],
}

let tokens = [
  {
    chainId: 3,
    address: '0x72709925c7439687fA680995119715aeF21013B8',
    name: 'BloodToken',
    symbol: 'BT',
    decimals: 18,
    logo: '/media/tokens/bt.svg',
    balance: 0,
  },
  {
    chainId: 4,
    address: '0x78C47CDffF49e93C20B0892BBb0446Ae44a75B2C',
    name: 'BloodToken',
    symbol: 'BT',
    decimals: 18,
    logo: '/media/tokens/bt.svg',
    balance: 0,
  },
  {
    chainId: 97,
    address: '0x7e55e7A475F0188194b3EC0A1ecA896aaD77D808',
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
