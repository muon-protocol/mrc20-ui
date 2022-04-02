import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { FrameConnector } from '@web3-react/frame-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'

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
]
const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY
// const FORTMATIC_KEY = process.env.NEXT_PUBLIC_FORTMATIC_KEY

const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/' + INFURA_KEY,
  3: 'https://mainnet.infura.io/v3/' + INFURA_KEY,
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
}

export const injected = new InjectedConnector({
  supportedChainIds,
})

const POLLING_INTERVAL = 2000

//only mainnet (walletconnect only one chain supports)
export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'app.deus.finance',
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
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink,
  // [ConnectorNames.Frame]: frame,
  // [ConnectorNames.Fortmatic]: fortmatic
  // [ConnectorNames.Network]: network,
}
