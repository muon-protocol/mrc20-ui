import { AddressZero } from '@ethersproject/constants'

import { MRC20Bridge_ABI } from '../constants/ABI'
import { getContract } from './contractHelpers'
import { MRC20Bridge } from '../constants/contracts'
import { getWeb3NoAccount } from './web3'

export const getTokenId = async (chainId, address) => {
  const web3 = getWeb3NoAccount(chainId)
  const contractBridge = getContract(MRC20Bridge_ABI, MRC20Bridge[chainId], web3)
  const tokenId = await contractBridge.methods.getTokenId(address).call()
  return tokenId
}

export const checkTokenOnDestBridge = async (chainId, tokenId) => {
  if (!tokenId) return AddressZero
  const web3 = getWeb3NoAccount(chainId)
  const contractBridge = getContract(MRC20Bridge_ABI, MRC20Bridge[chainId], web3)
  const address = await contractBridge.methods.tokens(tokenId).call()
  return address
}
