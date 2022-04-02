import random from 'lodash/random'
import { rpcConfig } from '../constants/chainsMap'

const getNodeUrl = (chainId = 1) => {
  try {
    const nodes = rpcConfig[chainId]['rpcUrls']
    const randomIndex = random(0, nodes.length - 1)
    return nodes[randomIndex]
  } catch (error) {
    console.log('error happend in getNodeUrl', error)
  }
}

export default getNodeUrl
