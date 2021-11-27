import { ChainMap } from '../constants/chainsMap'
import { LinkType } from '../constants/transactionStatus'

const EXPLORER_PREFIXES = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  56: '',
  100: 'mainnet',
  97: 'testnet.',
  128: '',
  137: '',
  256: 'testnet.',
  80001: 'mumbai.'
}

const getEtherscanLink = (chainId, data, type) => {
  const prefix = `https://${
    EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[1]
  }etherscan.io`

  switch (type) {
    case LinkType.Transaction: {
      return `${prefix}/tx/${data}`
    }
    case LinkType.TOKEN: {
      return `${prefix}/token/${data}`
    }
    default: {
      return `${prefix}/address/${data}`
    }
  }
}
const getFtmscanLink = (chainId, data, type) => {
  const prefix = `https://${
    EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[1]
  }ftmscan.com`

  switch (type) {
    case LinkType.Transaction: {
      return `${prefix}/tx/${data}`
    }
    case LinkType.TOKEN: {
      return `${prefix}/token/${data}`
    }
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

const getBlockscoutLink = (chainId, data, type) => {
  const prefix = `https://blockscout.com/xdai/${
    EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[100]
  }`

  switch (type) {
    case LinkType.Transaction: {
      return `${prefix}/tx/${data}`
    }
    case LinkType.TOKEN: {
      return `${prefix}/tokens/${data}`
    }
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

const getBscscanLink = (chainId, data, type) => {
  const prefix = `https://${
    EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[56]
  }bscscan.com`

  switch (type) {
    case LinkType.Transaction: {
      return `${prefix}/tx/${data}`
    }
    case LinkType.TOKEN: {
      return `${prefix}/token/${data}`
    }
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

const getHechoInfo = (chainId, data, type) => {
  const prefix = `https://${
    EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[128]
  }hecoinfo.com`

  switch (type) {
    case LinkType.Transaction: {
      return `${prefix}/tx/${data}`
    }
    case LinkType.TOKEN: {
      return `${prefix}/token/${data}`
    }
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

function getPolygonScan(chainId, data, type) {
  const prefix = `https://${
    EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[137]
  }polygonscan.com`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

export const getTransactionLink = (chainId, data, type) => {
  switch (chainId) {
    case 1:
    case 3:
    case 4: {
      return getEtherscanLink(chainId, data, type)
    }
    case ChainMap.BSC:
    case ChainMap.BSC_TESTNET: {
      return getBscscanLink(chainId, data, type)
    }
    case ChainMap.XDAI: {
      return getBlockscoutLink(chainId, data, type)
    }
    case ChainMap.FANTOM: {
      return getFtmscanLink(chainId, data, type)
    }

    case ChainMap.HECO_TESTNET:
    case ChainMap.HECO: {
      return getHechoInfo(chainId, data, type)
    }

    case ChainMap.MATIC_TESTNET:
    case ChainMap.MATIC: {
      return getPolygonScan(chainId, data, type)
    }

    default: {
      return getEtherscanLink(chainId, data, type)
    }
  }
}
