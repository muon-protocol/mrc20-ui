const axios = require('axios')

const BASE_URL = process.env.NEXT_PUBLIC_MUON_NODE_GATEWAY

const ethAddBridgeToken = (mainTokenAddress, mainNetwork, targetNetwork) => {
  let data = {
    app: 'eth',
    method: 'addBridgeToken',
    params: {
      mainTokenAddress,
      mainNetwork,
      targetNetwork
    }
  }
  return axios.post(BASE_URL, data).then(({ data }) => data)
}

const ethCallContract = (address, method, params, abi, network) => {
  let filteredAbi = [
    abi.find(({ name, type }) => name === method && type === 'function')
  ]
  let data = {
    app: 'eth',
    method: 'call',
    params: {
      address,
      method,
      params,
      abi: filteredAbi,
      outputs: ['user', 'amount', 'fromChain', 'toChain', 'tokenId', 'txId'],
      network
    }
  }
  return axios.post(BASE_URL, data).then(({ data }) => data)
}

export { ethAddBridgeToken, ethCallContract }
