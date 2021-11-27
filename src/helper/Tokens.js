import { ERC20_FUN, ERC20_FUN_MAP } from '../constants/misc'
import multicall from './multicall'

import { ERC20_ABI } from '../constants/ABI'
import { isAddress } from '.'
import { AddressZero } from '@ethersproject/constants'
import { getBalanceNumber } from './formatBalance'
import { escapeRegExp } from '../utils/utils'

export const getToken = async (address, account, fromChain) => {
  try {
    let token = ''
    if (!isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
    }

    const calls = Object.keys(ERC20_FUN).map((methodName) => {
      if (ERC20_FUN[methodName] === 'balanceOf')
        return {
          address: address,
          name: ERC20_FUN[methodName],
          params: [account]
        }
      else {
        return {
          address: address,
          name: ERC20_FUN[methodName]
        }
      }
    })
    const result = await multicall(
      fromChain.web3,
      ERC20_ABI,
      calls,
      fromChain.id
    )
    if (result && result.length > 0) {
      token = {
        symbol: result[ERC20_FUN_MAP.symbol][0],
        name: result[ERC20_FUN_MAP.name][0],
        decimals: result[ERC20_FUN_MAP.decimals][0],
        balances: {
          [fromChain.id]: getBalanceNumber(
            result[ERC20_FUN_MAP.balanceOf],
            result[ERC20_FUN_MAP.decimals][0]
          )
        },
        address: {
          [fromChain.id]: address
        }
      }
    }
    return token
  } catch (error) {}
}

// TODO complete this function and catch error localstorage safari
export const findAndAddToken = async (
  searchQuery,
  tokens,
  account,
  fromChain
) => {
  // Step 1: search in token list
  let finalTokens = [...tokens]
  let token = ''
  const search = new RegExp([escapeRegExp(searchQuery)].join(''), 'i')

  // let customTokens = JSON.parse(localStorage.getItem('tokens'))

  let resultFilter = finalTokens.filter((item) => {
    return (
      search.test(item.name) ||
      search.test(item.symbol) ||
      Object.values(item.address).indexOf(searchQuery) > -1
    )
  })
  if (resultFilter.length === 0 && isAddress(searchQuery)) {
    // step 2: check ERC20 and Add to  list

    token = await getToken(searchQuery, account, fromChain)
    token = { id: searchQuery, ...token, notPermission: true }

    if (token) {
      // if (!customTokens) {
      //   localStorage.setItem('tokens', JSON.stringify([token]))
      // } else {
      // const index = customTokens.findIndex(
      //   (item) => item.name === token.name && item.symbol === token.symbol
      // )
      // if (index !== -1) {
      //   customTokens.splice(index, 1, {
      //     ...customTokens[index],
      //     address: {
      //       ...customTokens[index].address,
      //       [fromChain.id]: searchQuery
      //     },
      //     balances: { ...customTokens[index].balances, ...token.balances }
      //   })
      // } else {
      //   customTokens = [...customTokens, token]
      // }

      // localStorage.setItem('tokens', JSON.stringify(customTokens))
      // }
      resultFilter.push(token)
    }
  }
  return { resultFilter, token }
}
