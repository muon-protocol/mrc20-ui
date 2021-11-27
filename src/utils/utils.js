import web3 from '../helper/web3'

import { chains } from '../constants/chains'
// TODO if tokens wasn't constant remember to change these funs
import { tokens } from '../constants/tokens'

export const formatAddress = (address) => {
  return address
    ? address.substring(0, 6) +
        '...' +
        address.substring(address.length - 4, address.length)
    : 'Connect Wallet'
}

export const findChain = (chainId) => {
  return chains.find((item) => item.id === chainId)
}

export const findToken = (tokenId) => {
  return tokens.find((item) => item.id === tokenId)
}

export const findTokenWithAddress = (tokens, address, chainId) => {
  return tokens.find((item) => item.address[chainId] === address)
}
export const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export const toWei = (n) => {
  return web3.utils.toWei(n)
}

export const fromWei = (n) => {
  return web3.utils.fromWei(n, 'ether')
}
