import Web3 from 'web3'

export const BN = Web3.utils.BN

export const fromWei = (n, decimals = 18) => {
  if (!n) return
  let unitMap = Web3.utils.unitMap
  let unit = Object.keys(unitMap).find((item) => unitMap[item] === new BN(10).pow(new BN(decimals)).toString())
  return Web3.utils.fromWei(n, unit)
}

export const toWei = (n, decimals = 18) => {
  if (!n) return
  let unitMap = Web3.utils.unitMap
  let unit = Object.keys(unitMap).find((item) => unitMap[item] === new BN(10).pow(new BN(decimals)).toString())
  return Web3.utils.toWei(n, unit)
}
