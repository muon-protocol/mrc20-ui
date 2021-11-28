export const ChainMap = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  XDAI: 100,
  FANTOM: 250,
  FANTOM_TESTNET: 4002,
  BSC: 56,
  BSC_TESTNET: 97,
  HECO: 128,
  HECO_TESTNET: 256,
  MATIC: 137,
  MATIC_TESTNET: 80001
}

export const NameChainMap = {
  1: 'ETH',
  3: 'Ropsten',
  4: 'Rinkeby',
  100: 'xDAI',
  250: 'FTM',
  4002: 'FTM TEST',
  56: 'BSC',
  128: 'HECO',
  256: 'HECOT',
  97: 'BSC TEST',
  137: 'MATIC',
  80001: 'Mumbai'
}

export const rpcConfig = {
  [ChainMap.ETH]: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [
      'https://mainnet.infura.io/v3/' + process.env.NEXT_PUBLIC_INFURA_KEY
    ],
    blockExplorerUrls: ['https://etherscan.io/']
  },
  [ChainMap.RINKEBY]: {
    chainId: '0x4',
    chainName: 'Rinkeby Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [
      'https://rinkeby.infura.io/v3/' + process.env.NEXT_PUBLIC_INFURA_KEY
    ],
    blockExplorerUrls: ['https://rinkeby.etherscan.io/']
  },
  [ChainMap.ROPSTEN]: {
    chainId: '0x3',
    chainName: 'Ropsten Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [
      'https://ropsten.infura.io/v3/' + process.env.NEXT_PUBLIC_INFURA_KEY
    ],
    blockExplorerUrls: ['https://ropsten.etherscan.io/']
  },
  [ChainMap.XDAI]: {
    chainId: '0x64',
    chainName: 'xDAI Chain',
    nativeCurrency: {
      name: 'xDAI',
      symbol: 'xDAI',
      decimals: 18
    },
    rpcUrls: ['https://rpc.xdaichain.com/'],
    blockExplorerUrls: ['https://blockscout.com/poa/xdai/']
  },
  [ChainMap.MATIC]: {
    chainId: '0x89',
    chainName: 'Matic Mainnet',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
    iconUrls: []
  },
  [ChainMap.MATIC_TESTNET]: {
    chainId: '0x13881',
    chainName: 'Mumbai',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://rpc-endpoints.superfluid.dev/mumbai'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    iconUrls: []
  },
  [ChainMap.BSC]: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: [
      'https://bsc-dataseed.binance.org/',
      'https://bsc-dataseed1.defibit.io/'
    ],
    blockExplorerUrls: ['https://bscscan.com']
  },
  [ChainMap.BSC_TESTNET]: {
    chainId: '0x61',
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com']
  },
  [ChainMap.HECO]: {
    chainId: '0x80',
    chainName: 'Huobi ECO Chain Mainnet',
    nativeCurrency: {
      name: 'HT',
      symbol: 'HT',
      decimals: 18
    },
    rpcUrls: ['https://http-mainnet.hecochain.com'],
    blockExplorerUrls: ['https://hecoinfo.com']
  },
  [ChainMap.HECO_TESTNET]: {
    chainId: '0x100',
    chainName: 'Huobi ECO Chain Testnet',
    nativeCurrency: {
      name: 'htt',
      symbol: 'htt',
      decimals: 18
    },
    rpcUrls: ['https://http-testnet.hecochain.com'],
    blockExplorerUrls: ['https://testnet.hecoinfo.com']
  },
  [ChainMap.AVALANCHE]: {
    chainId: '0xa86a',
    chainName: 'Avalanche Network',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax.network/']
  },
  [ChainMap.FANTOM]: {
    chainId: '0xFA',
    chainName: 'Fantom Opera',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18
    },
    rpcUrls: ['https://rpc.ftm.tools/'],
    blockExplorerUrls: ['https://ftmscan.com/']
  },
  [ChainMap.FANTOM_TESTNET]: {
    chainId: '0xfa2',
    chainName: 'Fantom testnet Opera',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18
    },
    rpcUrls: ['https://rpc.testnet.fantom.network/'],
    blockExplorerUrls: ['https://testnet.ftmscan.com/']
  }
}
