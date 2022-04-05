import { AddressZero } from '@ethersproject/constants'
import multicall from './multicall'
import { isAddress } from './isAddress'
import { toCheckSumAddress } from './toCheckSumAddress'
import { ERC20_ABI } from '../constants/ABI'
import { getWeb3NoAccount } from './web3'
import { ERC20_FUN, ERC20_FUN_MAP } from '../constants/constants'
import { fromWei } from './wei'
import tokens from '../constants/settings'

export const getToken = async (address, chainId, account) => {
  try {
    let token = ''
    const web3 = getWeb3NoAccount(chainId)
    if (!isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
    }
console.log({address ,chainId})
    const calls = Object.keys(ERC20_FUN).map((methodName) => {
      if (ERC20_FUN[methodName] === 'balanceOf')
        return {
          address: address,
          name: ERC20_FUN[methodName],
          params: [account],
        }
      else {
        return {
          address: address,
          name: ERC20_FUN[methodName],
        }
      }
    })
    const result = await multicall(web3, ERC20_ABI, calls, chainId)
    console.log(result)
    if (result && result.length > 0) {
      token = {
        chainId,
        symbol: result[ERC20_FUN_MAP.symbol][0],
        name: result[ERC20_FUN_MAP.name][0],
        decimals: result[ERC20_FUN_MAP.decimals][0],
        balance: fromWei(result[ERC20_FUN_MAP.balanceOf].toString(), result[ERC20_FUN_MAP.decimals][0].toString()),
        address,
      }
    }
    return token
  } catch (error) {
    console.log('error happend in get token', error)
  }
}

// TODO complete this function and catch error localstorage safari
export const findAndAddToken = async (searchQuery, account, chainId) => {
  if (!isAddress(searchQuery)) {
    console.log(`Invalid 'address' parameter '${searchQuery}'.`)
    return
  }
  // Step 1: search in token list
  let finalTokens = combineDefaultAndLocalStorage()
  let token = ''

  let resultFilter = finalTokens.find((item) => {
    return item.chainId === chainId && toCheckSumAddress(item.address) === toCheckSumAddress(searchQuery)
  })
  if (!resultFilter && isAddress(searchQuery)) {
    let customTokens = JSON.parse(localStorage.getItem('tokens'))

    // step 2: check ERC20 and Add to  list

    token = await getToken(searchQuery, chainId,account)
console.log({token})
    if (token) {
      if (!customTokens) {
        localStorage.setItem('tokens', JSON.stringify([token]))
      } else {
        customTokens = [...customTokens, token]
        localStorage.setItem('tokens', JSON.stringify(customTokens))
      }

      resultFilter = token
    }
  }
  return resultFilter
}

export const combineDefaultAndLocalStorage = () => {
  const localStorageToken = JSON.parse(localStorage.getItem('tokens'))
  const tokensList = localStorageToken ? [...tokens, ...localStorageToken] : tokens
  return tokensList
}
