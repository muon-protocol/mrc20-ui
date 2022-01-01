import random from 'lodash/random'
import { rpcConfig } from '../constants/chainsMap'

const getNodeUrl = (chainId) => {
  const nodes = rpcConfig[chainId]['rpcUrls']
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default getNodeUrl
