import Web3 from 'web3'

export const toCheckSumAddress = (address) => {
  return Web3.utils.toChecksumAddress(address)
}
