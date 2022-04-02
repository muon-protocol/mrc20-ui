import { MultiCall_ABI } from '../constants/ABI'
import { MULTICALL_NETWORKS } from '../constants/multicallContracts'
import { ChainMap } from '../constants/chainsMap'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { isAddress } from './isAddress'

export const getContract = (abi, address, web3) => {
  return new web3.eth.Contract(abi, address)
}

export const getMultiCallContract = (web3, chainId = ChainMap.ETH) => {
  return getContract(MultiCall_ABI, MULTICALL_NETWORKS[chainId], web3)
}

// account is not optional
function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract2(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account))
}
