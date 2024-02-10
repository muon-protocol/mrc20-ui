import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { FrameConnector } from '@web3-react/frame-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import { flow } from 'lodash'
import { validChains } from '../constants/settings'

const supportedChainIds = [
  1, // Mainet
  3, // Ropsten
  4, // Rinkeby
  42, // Kovan
  0x64, // xDAI
  77, //sokol
  0x38, // BSC
  0x61, // BSC TEST
  250, // Fantom
  4002, // Fantom TEST,
  137, // Matic
  80001, // Maticc Mumbai
  10,
  42161,
]
const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY
// const FORTMATIC_KEY = process.env.NEXT_PUBLIC_FORTMATIC_KEY

const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/' + INFURA_KEY,
  3: 'https://ropsten.infura.io/v3/' + INFURA_KEY,
  4: 'https://rinkeby.infura.io/v3/' + INFURA_KEY,
  56: 'https://bsc-dataseed1.binance.org',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  100: 'https://rpc.xdaichain.com',
  77: 'https://sokol.poa.network/',
  4002: 'https://rpc.testnet.fantom.network/',
  128: 'https://http-mainnet-node.huobichain.com',
  256: 'https://http-testnet.hecochain.com',
  250: 'https://rpcapi.fantom.network',
  137: 'https://rpc-mainnet.maticvigil.com/',
  80001: 'https://matic-mumbai.chainstacklabs.com',
  10: 'https://rpc.ankr.com/optimism',
  42161: 'https://endpoints.omniatech.io/v1/arbitrum/one/public',
}

const validRPC = flow([
  Object.entries,
  (arr) => arr.filter(([key]) => validChains[process.env.NEXT_PUBLIC_MODE].includes(Number(key))),
  Object.fromEntries,
])(RPC_URLS)

export const injected = new InjectedConnector({
  supportedChainIds,
})

export const walletConnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  supportedChainIds: validChains[process.env.NEXT_PUBLIC_MODE],
  qrcode: true,
})

export const walletLink = new WalletLinkConnector({
  url: validRPC,
  appName: 'MRC20-Bridge',
})

export const fortmatic = new FortmaticConnector({
  apiKey: 'pk_live_643EBE31BE0118DA',
  chainId: 1,
})

export const frame = new FrameConnector({ supportedChainIds: [1] })

export const ConnectorNames = {
  Injected: 'MetaMask',
  Network: 'Network',
  WalletConnect: 'WalletConnect',
  WalletLink: 'WalletLink',
  Ledger: 'Ledger',
  Trezor: 'Trezor',
  Lattice: 'Lattice',
  Frame: 'Frame',
  Fortmatic: 'Fortmatic',
}

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletConnect,
  [ConnectorNames.WalletLink]: walletLink,
  // [ConnectorNames.Frame]: frame,
  // [ConnectorNames.Fortmatic]: fortmatic
  // [ConnectorNames.Network]: network,
}
