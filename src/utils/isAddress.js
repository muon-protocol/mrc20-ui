import { getAddress } from '@ethersproject/address'

export const isAddress = (value) => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}
