import { getAddress } from '@ethersproject/address'

export const makeContract = (web3, abi, address) => {
  return new web3.eth.Contract(abi, address)
}

export const isAddress = (value) => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}
