import React from 'react'
import { useWeb3React } from '@web3-react/core'

import { ERC20_ABI } from '../constants/ABI'
import multicall from '../helper/multicall'
import { getBalanceNumber } from '../helper/formatBalance'
import { useCrossWeb3 } from './useWeb3'

const useAssetBalances = (chains, tokens) => {
  const { account } = useWeb3React()
  const [balances, setBalances] = React.useState(null)

  let crossWeb3 = {}
  for (let index = 0; index < chains.length; index++) {
    const chainId = chains[index]
    const web3 = useCrossWeb3(chainId)
    crossWeb3 = { ...crossWeb3, [chainId]: web3 }
  }
  React.useEffect(() => {
    const fetchBalances = async () => {
      for (let index = 0; index < chains.length; index++) {
        const chainId = chains[index]
        const calls = tokens
          .filter((item) => item.address[chainId])
          .map((token) => {
            return {
              address: token.address[chainId],
              name: 'balanceOf',
              params: [account]
            }
          })
        const result = await multicall(
          crossWeb3[chainId],
          ERC20_ABI,
          calls,
          chainId
        )
        if (result && result.length > 0) {
          for (let i = 0; i < result.length; i++) {
            const balance = result[i]
            const address = calls[i].address

            let token = tokens.find(
              (token) => token.address[chainId] === address
            )
            token.balances[chainId] = getBalanceNumber(
              balance,
              tokens[address]?.decimals
            )
          }
        }
      }
      setBalances(tokens)
    }
    if (account) fetchBalances()
    const interval = setInterval(() => {
      if (account) {
        fetchBalances()
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [account])
  return balances
}

export default useAssetBalances
